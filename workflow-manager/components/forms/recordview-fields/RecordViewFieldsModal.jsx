import { Button, Card, CardContent, Modal } from "@mui/material";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import DraggableRecordViewField from "./DraggableRecordViewField";
import ConfirmModal from "@/components/ui-components/ConfirmModal";
import useDragAndDropUtils from "@/hooks/utility-hooks/useDragAndDropUtils";

const recordFieldTemplate = {
  recordViewFieldId: "",
  recordViewId: "",
  fieldId: null,
  caption: "",
  groupName: "",
  differingCaption: null,
  differingGroupName: null,
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
  const recordViewFields = useSelector(
    (state) => state.workflow.recordViewFields
  );

  const filteredRecordViewFields = useMemo(() => {
    return recordViewFields?.filter((rvf) => rvf.recordViewId === recordViewId);
  }, [recordViewFields, recordViewId]);

  const [fields, setFields] = useState(filteredRecordViewFields);

  const [confirmModalValues, setConfirmModalValues] = useState({
    isOpen: false,
    dialogTitle: "",
    dialogContent: "",
    confirmBtnText: "",
    confirmFunction: null,
  });

  const { assignSortOrderAndDragIndicator, ...dragUtils } = useDragAndDropUtils(
    fields,
    setFields
  );

  const { updateAllRecordViewFields, generateRandomId } = useWorkflowForms();

  //TODO: Refactoring is needed
  const handleAddRecordView = () => {
    const newSortOrder = fields.at(-1)?.sortOrder + 1;
    const newRecordViewField = {
      ...recordFieldTemplate,
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
    const { caption, recordViewFieldId } = recordField;
    const temp = {
      isOpen: true,
      dialogTitle: "Löschen!",
      dialogContent: `Möchten Sie das Feld "${recordViewFieldId} - ${caption}" löschen?`,
      confirmBtnText: "Löschen",
      handleConfirm: () => deleteRecordViewField(recordViewFieldId),
    };
    setConfirmModalValues(temp);
  };
  const changeRecordFieldTotally = (recordField) => {
    const fieldsUpdated = fields.map((el) => {
      if (el.recordViewFieldId === recordField.recordViewFieldId) {
        return recordField;
      } else {
        return el;
      }
    });

    setFields(fieldsUpdated);
  };
  const changeRecordFieldValue = (name, value, fieldID) => {
    const fieldsUpdated = fields.map((el) => {
      if (el.recordViewFieldId === fieldID) {
        return { ...el, [name]: value };
      } else {
        return el;
      }
    });
    if (name === "sortOrder") {
      fieldsUpdated.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    setFields(fieldsUpdated);
  };

  const updateStoreOnClose = () => {
    updateAllRecordViewFields(recordViewId, fields);
    setOpen(false);
  };
  //TODO: Remove useEffect if possible
  // useEffect(() => {
  //   const filteredRecordViewFields = recordViewFields?.filter(
  //     (rvf) => rvf.recordViewId === recordViewId
  //   );

  //   if (!filteredRecordViewFields) return;

  //   setFields(filteredRecordViewFields);
  // }, [recordViewId]);

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
                    changeRecordFieldTotally={changeRecordFieldTotally}
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
