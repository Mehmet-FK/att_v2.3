import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import Accordion from "@/components/ui-components/Accordion";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import React, { useState } from "react";
import ConditionalFieldForm from "./ConditionalFieldForm";
import { Button } from "@mui/material";
import ModalDialogFieldUpdate from "@/workflow-manager/models/modal-dialog/ModalDialogFieldUpdate";

const ModalDialogFieldUpdates = ({
  fieldUpdates,
  modalDialogId,
  updateModalDialogValue,
  entityFields,
}) => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const [fieldUpdateValues, setFieldUpdateValues] = useState(fieldUpdates);

  const openConfirmModalToDelete = (fieldUpdateID) => {
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie das Dialogfeld löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => handleDeleteFieldUpdate(fieldUpdateID),
    };
    setConfirmModalValues(temp);
  };

  const handleDeleteFieldUpdate = (fieldUpdateID) => {
    const filteredFields = fieldUpdateValues.filter(
      (field) => field.modalDialogFieldId !== fieldUpdateID
    );
    updateModalDialogValue("fieldUpdates", filteredFields, modalDialogId);
    setFieldUpdateValues(filteredFields);
  };

  const handleAddFieldUpdate = () => {
    const newField = new ModalDialogFieldUpdate({}).toObject();
    const newFieldUpdates = [...fieldUpdateValues, newField];

    updateModalDialogValue("fieldUpdates", newFieldUpdates, modalDialogId);
    setFieldUpdateValues((prev) => [...prev, newField]);
  };

  const handleChange = (e, fieldUpdateID) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFieldUpdateValues((prev) =>
      prev.map((field) => {
        if (field.modalDialogFieldId === fieldUpdateID) {
          return { ...field, [name]: newValue };
        } else {
          return field;
        }
      })
    );
  };

  const handleBlur = () => {
    updateModalDialogValue("fieldUpdates", fieldUpdateValues, modalDialogId);
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
        header={"Felder"}
      >
        <div className={css.flex_column}>
          <div
            className={css.flex_row}
            style={{ flexWrap: "wrap", rowGap: "10px" }}
          >
            {fieldUpdateValues.map((fieldUpdate) => (
              <ConditionalFieldForm
                key={fieldUpdate?.modalDialogFieldId}
                fieldFormValues={fieldUpdate}
                handleChange={handleChange}
                handleBlur={handleBlur}
                openConfirmModalToDelete={openConfirmModalToDelete}
                entityFields={entityFields}
              />
            ))}
          </div>
          <Button variant="contained" onClick={handleAddFieldUpdate}>
            Feld Anlegen
          </Button>
        </div>
      </Accordion>
    </>
  );
};

export default ModalDialogFieldUpdates;
