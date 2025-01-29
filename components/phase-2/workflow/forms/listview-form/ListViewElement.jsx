import IconSelect from "@/components/form-elements/IconSelect";
import ListViewElementRow from "./ListViewElementRow";
import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import { useState } from "react";
import Accordion from "@/components/ui-components/Accordion";
import ConfirmModal from "@/components/ui-components/ConfirmModal";

const ListViewElement = ({ element, entityFields }) => {
  const [elementValues, setElementValues] = useState(element);

  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const { listViewElementRows } = useSelector((state) => state.workflow);

  const { createListViewElementRow, updateListViewElementValue } =
    useWorkflowForms();

  const elementRows = listViewElementRows.filter(
    (lver) => lver.listViewElementId === element?.listViewElementId
  );
  const handleAddListViewElementRow = () => {
    createListViewElementRow(element.listViewElementId);
  };

  const openConfirmModalToDelete = (deleteCallback) => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie diese Listenzeile löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteCallback(),
    };
    setConfirmModalValues(temp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElementValues({ ...elementValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateListViewElementValue(name, value, element.listViewElementId);
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
        header={"List View Element"}
      >
        <div className={css.flex_column}>
          <IconSelect
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={elementValues?.icon || ""}
          />
          <div className={css.flex_column}>
            {elementRows.map((row) => (
              <ListViewElementRow
                key={row.listViewElementRowId}
                openConfirmModalToDelete={openConfirmModalToDelete}
                elementRowValues={row}
                entityFields={entityFields}
              />
            ))}
          </div>

          <Button variant="contained" onClick={handleAddListViewElementRow}>
            List Element Anlegen
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export default ListViewElement;
