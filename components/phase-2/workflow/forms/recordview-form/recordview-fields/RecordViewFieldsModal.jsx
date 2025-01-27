import { Button, Card, CardContent, Modal } from "@mui/material";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import DraggableRecordViewField from "./DraggableRecordViewField";

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
  const { recordViewFields } = useSelector((state) => state.workflow);

  const filteredRecordViewFields = useMemo(
    () => recordViewFields?.filter((rvf) => rvf.recordViewId === recordViewId),
    [recordViewFields, recordViewId]
  );

  const [fields, setFields] = useState([...filteredRecordViewFields]);

  const { updateAllRecordViewFields, generateRandomId } = useWorkflowForms();

  const assignFieldIndexToSortOrder = () => {
    const preparedFields = filteredRecordViewFields?.map((field, index) => ({
      ...field,
      sortOrder: index + 1,
      isDraggedOver: false,
    }));
    setFields(preparedFields);
  };

  useEffect(() => {
    if (filteredRecordViewFields?.length < 1) return;
    assignFieldIndexToSortOrder();
  }, [filteredRecordViewFields]);

  const draggingElementRef = useRef(null);
  const draggedOverElementRef = useRef(null);

  const dragStart = (e, field, index) => {
    draggingElementRef.current = { field, index };

    const dragElement = e.target;
    const clone = dragElement.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.top = "-1000px";
    clone.style.left = "-1000px";
    clone.style.background = "#f00";
    clone.style.marginTop = "500px";
    clone.style.width = `${dragElement.offsetWidth}px`;
    clone.style.height = `60px`;
    // clone.style.height = `${dragElement.offsetHeight}px`;
    clone.style.cursor = "grab";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    const offsetX = dragElement.offsetWidth - 10;
    const offsetY = dragElement.offsetHeight - 20;

    e.dataTransfer.setDragImage(clone, offsetX, offsetY);

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };
  const dragEnter = (field, index) => {
    draggedOverElementRef.current = { field, index };
  };

  const dragEnd = (e, field, index) => {
    let tempFields = [...fields];

    if (!draggedOverElementRef.current || !draggingElementRef.current) return;

    const draggingField = draggingElementRef.current.field;
    const draggingFieldIndex = draggingElementRef.current.index;
    const draggedOverFieldIndex = draggedOverElementRef.current.index;
    if (draggingFieldIndex === draggedOverFieldIndex) {
      return;
    }
    console.log({
      draggedOverField: draggedOverElementRef.current,
      draggingElementRef: draggingElementRef.current,
    });

    tempFields.splice(draggingFieldIndex, 1);
    tempFields.splice(draggedOverFieldIndex, 0, draggingField);

    tempFields = tempFields.map((f, index) => ({ ...f, sortOrder: index + 1 }));

    draggingElementRef.current = null;
    draggedOverElementRef.current = null;

    setFields(tempFields);
  };

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
    console.log(changedFieds);
    setFields(changedFieds);
  };

  const updateStoreOnClose = () => {
    updateAllRecordViewFields(recordViewId, fields);
    setOpen(false);
  };

  return (
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
                  index={index}
                  recordViewField={recordViewField}
                  entityFields={entityFields}
                  deleteRecordViewField={deleteRecordViewField}
                  changeRecordFieldValue={changeRecordFieldValue}
                  dragStart={dragStart}
                  dragEnter={dragEnter}
                  dragEnd={dragEnd}
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
  );
};

export default RecordViewFieldsModal;
