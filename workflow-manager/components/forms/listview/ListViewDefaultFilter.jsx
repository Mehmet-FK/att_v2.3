import Accordion from "@/components/ui-components/Accordion";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import ElementBadge from "@/components/ui-components/ElementBadge";
import CustomSelect from "@/components/ui-components/CustomSelect";

const DefaultFilterElement = ({
  filterElement,
  openConfirmModalToDelete,
  updateDefaultListViewFilterValue,
  entityFields,
}) => {
  const [defaultFilterValues, setDefaultFilterValues] = useState(filterElement);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDefaultFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value.toString();

    const filterID = filterElement.listViewDefaultFilterId;

    updateDefaultListViewFilterValue(name, newValue, filterID);
  };

  const handleDeleteDefaultFilter = (e) => {
    const filterID = filterElement.listViewDefaultFilterId;
    openConfirmModalToDelete(filterID);
  };

  return (
    <div style={{ maxWidth: "30%", width: "100%" }}>
      <ElementBadge handleClickOnBadge={handleDeleteDefaultFilter}>
        <Card sx={{ width: "100%", backgroundColor: "inherit" }}>
          <CardContent>
            <div className={css.flex_column}>
              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={defaultFilterValues?.fieldId}
                label="Feld"
                name="fieldId"
                size="small"
                preferences={{ key: "id", caption: "caption" }}
                options={entityFields}
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={defaultFilterValues?.filterValue || ""}
                variant="outlined"
                size="small"
                label="Filter Value"
                name="filterValue"
                fullWidth
              />
            </div>
          </CardContent>
        </Card>
      </ElementBadge>
    </div>
  );
};

const ListViewDefaultFilter = ({ listViewId, entityFields }) => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const {
    createListViewDefaultFilter,
    updateDefaultListViewFilterValue,
    deleteDefaultListViewFilter,
  } = useWorkflowForms();

  const defaultFilters = useSelector(
    (state) => state.workflow?.listViewDefaultFilters
  );

  const currentFilters = defaultFilters.filter(
    (f) => f.listViewId === listViewId
  );

  const handleAddDefaultFilter = () => {
    createListViewDefaultFilter(listViewId);
  };

  const openConfirmModalToDelete = (filterId) => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie den Filter löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteDefaultListViewFilter(filterId),
    };
    setConfirmModalValues(temp);
  };

  return (
    <>
      <ConfirmModal
        confirmModalValues={confirmModalValues}
        setConfirmModalValues={setConfirmModalValues}
      />
      <Accordion
        accordionProps={{
          sx: { paddingBlock: 0, width: "100%" },
        }}
        headerProps={{ sx: { fontSize: "smaller" } }}
        header={"Default Filter"}
      >
        <div className={css.flex_column}>
          <div
            className={css.flex_row}
            style={{ flexWrap: "wrap", rowGap: "10px" }}
          >
            {currentFilters.map((filterElement) => (
              <DefaultFilterElement
                key={filterElement.listViewDefaultFilterId}
                openConfirmModalToDelete={openConfirmModalToDelete}
                updateDefaultListViewFilterValue={
                  updateDefaultListViewFilterValue
                }
                filterElement={filterElement}
                entityFields={entityFields}
              />
            ))}
          </div>

          <Button variant="contained" onClick={handleAddDefaultFilter}>
            Filter Anlegen
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export default ListViewDefaultFilter;
