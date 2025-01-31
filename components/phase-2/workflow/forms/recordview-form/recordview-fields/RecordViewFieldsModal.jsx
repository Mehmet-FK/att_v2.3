import { Button, Card, CardContent, Modal } from "@mui/material";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import DraggableRecordViewField from "./DraggableRecordViewField";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import useDragAndDropUtils from "@/hooks/workflow-hooks/workflow-form-utility-hooks/useDragAndDropUtils";

const recordViewTemplate = {
  recordViewFieldId: "",
  recordViewId: "",
  fieldId: null,
  differingCaption: "",
  differingGroupName: "",
  isDefault: false,
  isReadOnly: false,
  imageMode: null,
  imageGroupCaption: null,
  imageType: null,
  sortOrder: null,
  isDraggedOver: false,
};

const RecordViewFieldsModal = ({
  open,
  setOpen,
  recordViewId,
  entityFields,
}) => {
  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const { recordViewFields } = useSelector((state) => state.workflow);

  const filteredRecordViewFields = useMemo(
    () => recordViewFields?.filter((rvf) => rvf.recordViewId === recordViewId),
    [recordViewFields, recordViewId]
  );

  const [fields, setFields] = useState([...filteredRecordViewFields]);

  const { assignSortOrderAndDragIndicator, ...dragUtils } = useDragAndDropUtils(
    fields,
    setFields
  );

  const { updateAllRecordViewFields, generateRandomId } = useWorkflowForms();

  useEffect(() => {
    if (filteredRecordViewFields?.length < 1) return;
    assignSortOrderAndDragIndicator(filteredRecordViewFields);
  }, [filteredRecordViewFields]);

  //TODO: Refactoring is needed
  const handleAddRecordView = () => {
    const newSortOrder = fields.at(-1)?.sortOrder + 1;
    const newRecordViewField = {
      ...recordViewTemplate,
      recordViewFieldId: generateRandomId("record-field-", null),
      recordViewId,
      sortOrder: newSortOrder,
    };
    setFields([...fields, newRecordViewField]);
  };

  const deleteRecordViewField = (fieldID) => {
    setFields((prev) => prev.filter((f) => f.recordViewFieldId !== fieldID));
  };

  const openConfirmModalToDelete = (recordField) => {
    const { fieldId, fieldCaption, recordViewFieldId } = recordField;
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie das Feld "${fieldId} - ${fieldCaption}" löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteRecordViewField(recordViewFieldId),
    };
    setConfirmModalValues(temp);
  };

  const changeRecordFieldValue = (name, value, fieldID) => {
    const changedFieds = fields.map((el) => {
      if (el.recordViewFieldId === fieldID) {
        return { ...el, [name]: value };
      } else {
        return el;
      }
    });
    if (name === "sortOrder") {
      changedFieds.sort((a, b) => a.sortOrder - b.sortOrder);
    }
    setFields(changedFieds);
  };

  const updateStoreOnClose = () => {
    updateAllRecordViewFields(recordViewId, fields);
    setOpen(false);
  };

  return (
    <>
      <ConfirmModal
        confirmModalValues={confirmModalValues}
        setConfirmModalValues={setConfirmModalValues}
      />

      <Modal
        open={open}
        onClose={updateStoreOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={css.card}>
          <CardContent className={css.content}>
            <div
              className={css.flex_column}
              style={{
                minHeight: "100%",
                justifyContent: "space-between",
              }}
            >
              <div className={css.flex_column}>
                {fields?.map((recordViewField, index) => (
                  <DraggableRecordViewField
                    key={recordViewField?.recordViewFieldId}
                    index={index}
                    recordViewField={recordViewField}
                    entityFields={entityFields}
                    openConfirmModalToDelete={openConfirmModalToDelete}
                    changeRecordFieldValue={changeRecordFieldValue}
                    dragUtils={dragUtils}
                  />
                ))}
              </div>

              <Button onClick={handleAddRecordView} variant="contained">
                Recordview Feld anlegen
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default RecordViewFieldsModal;
