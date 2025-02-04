import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import { Badge, Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSelect from "../common-form-elements/CustomSelect";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import Accordion from "@/components/ui-components/Accordion";
import ElementBadge from "../common-form-elements/ElementBadge";
import ConfirmModal from "@/components/ui-components/ConfirmModal";

const FilterDefinitionForm = ({
  definitionValues,
  openConfirmModalToDelete,
  updateDefinitionValue,
  entityFields,
}) => {
  const [definitionFormValues, setDefinitionFormValues] =
    useState(definitionValues);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDefinitionFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const definitionID = definitionFormValues.filterDefinitionId;
    updateDefinitionValue(name, newValue, definitionID);
  };

  const handleDeleteDefinition = (e) => {
    const definitionID = definitionFormValues.filterDefinitionId;
    openConfirmModalToDelete(definitionID);
  };

  useEffect(() => {
    setDefinitionFormValues(definitionValues);
  }, [definitionValues?.filterDefinitionId]);

  return (
    <div style={{ maxWidth: "30%", width: "100%" }}>
      <ElementBadge handleClickOnBadge={handleDeleteDefinition}>
        <Card
          title={definitionFormValues?.filterDefinitionId}
          sx={{ width: "100%", backgroundColor: "inherit" }}
        >
          <CardContent>
            <div className={css.flex_column}>
              <CustomSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={definitionFormValues?.fieldId}
                label="Feld"
                name="fieldId"
                size="small"
                preferences={{ key: "id", caption: "caption" }}
                options={entityFields}
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={definitionFormValues?.filterValue || ""}
                variant="outlined"
                size="small"
                label="filterValue"
                name="filterValue"
                fullWidth
              />
            </div>
          </CardContent>
        </Card>
      </ElementBadge>{" "}
    </div>
  );
};

const ListViewFilterDefinitions = ({ listViewId, entityFields }) => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const listViewFilterDefinitions = useSelector(
    (state) => state.workflow.listViewFilterDefinitions
  );

  const {
    createListViewFilterDefinition,
    updateFilterDefinitionValue,
    deleteFilterDefinition,
  } = useWorkflowForms();

  const filterDefinitions = useMemo(
    () =>
      listViewFilterDefinitions.filter((fd) => fd.listViewId === listViewId),
    [listViewFilterDefinitions, listViewId]
  );

  // const [definitionList, setDefinitionList] = useState(filterDefinitions);

  const handleAddFilterDefinition = () => {
    createListViewFilterDefinition(listViewId);
  };

  const openConfirmModalToDelete = (definitionID) => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie die Filterdefinition löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteFilterDefinition(definitionID),
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
        header={"Filter Definitionen"}
      >
        <div className={css.flex_column}>
          <div
            className={css.flex_row}
            style={{ flexWrap: "wrap", rowGap: "10px" }}
          >
            {filterDefinitions.map((definition) => (
              <FilterDefinitionForm
                key={definition?.filterDefinitionId}
                definitionValues={definition}
                deleteDefinition={deleteFilterDefinition}
                openConfirmModalToDelete={openConfirmModalToDelete}
                updateDefinitionValue={updateFilterDefinitionValue}
                entityFields={entityFields}
              />
            ))}
          </div>

          <Button variant="contained" onClick={handleAddFilterDefinition}>
            Definition Anlegen
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export default ListViewFilterDefinitions;
