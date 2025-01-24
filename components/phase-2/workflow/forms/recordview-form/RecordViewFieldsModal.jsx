import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
} from "@mui/material";
// import css from "@/styles/workflow-forms/recordview-fields.module.css";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckBox from "../common-form-elements/CheckBox";
import { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import DeleteIcon from "@mui/icons-material/Delete";

const DraggableRecordViewField = ({
  index,
  recordViewField,
  entityFields,
  deleteRecordViewField,
  changeRecordFieldValue,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}) => {
  const [fieldFormValues, setFieldFormValues] = useState(recordViewField);
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const isDraggedOver = fieldFormValues.isDraggedOver;

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFieldFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    changeRecordFieldValue(name, newValue, fieldFormValues.recordViewFieldId);
  };

  const handleDeleteField = (e) => {
    if (e.detail < 2) return;
    deleteRecordViewField(fieldFormValues.recordViewFieldId);
  };

  useEffect(() => {
    setFieldFormValues(recordViewField);
  }, [recordViewField.fieldId]);
  return (
    <div
      droppable
      draggable
      className={css.flex_row}
      style={{
        marginRight: "-15px",
        paddingRight: "10px",

        paddingBlock: isDraggedOver ? "15px" : "5px",
        boxShadow:
          isDraggedOver &&
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        transition: "all 0.2s ease-in-out ",
      }}
      onDragStart={(e) => {
        setAccordionExpanded(false);
        handleDragStart(e, fieldFormValues, index);
      }}
      onDragEnter={(e) => {
        handleDragEnter(fieldFormValues, index);
        setFieldFormValues((prev) => ({ ...prev, isDraggedOver: true }));
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => {
        setFieldFormValues((prev) => ({ ...prev, isDraggedOver: false }));
      }}
      onDragEnd={(e) => {
        handleDragEnd(fieldFormValues, index);
        setFieldFormValues((prev) => ({ ...prev, isDraggedOver: false }));
      }}
    >
      <Badge
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        badgeContent={<DeleteIcon color="secondary" fontSize="small" />}
        slotProps={{
          badge: {
            sx: {
              marginLeft: "10px",
              width: "1.7rem",
              height: "1.7rem",
              backgroundColor: "#ccc",
              cursor: "pointer",
              display: "flex",
              opacity: "0",
              transition: "all 0.2s ease-in-out",
            },
            onClick: handleDeleteField,
          },
        }}
        sx={{
          width: "100%",

          backgroundColor: "inherit",
          pointerEvents: isDraggedOver ? "none" : "auto",
          "&:hover .MuiBadge-badge": {
            opacity: "1",
          },
        }}
      >
        <Accordion
          defaultExpanded={false}
          expanded={accordionExpanded}
          onChange={() => setAccordionExpanded(!accordionExpanded)}
          sx={{
            width: "100%",
            backgroundColor: "inherit",
            pointerEvents: isDraggedOver ? "none" : "auto",
          }}
        >
          <AccordionSummary
            sx={{ fontSize: "smaller", paddingBlock: "0" }}
            expandIcon={<ExpandMoreIcon fontSize="small" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {entityFields?.find((f) => f.id === fieldFormValues?.fieldId)
              ?.caption ||
              fieldFormValues?.differingCaption ||
              "Neues Feld"}
          </AccordionSummary>
          <AccordionDetails>
            <div className={css.flex_row} style={{ alignItems: "center" }}>
              <div className={css.flex_column}>
                <div className={css.flex_row}>
                  <AutoCompleteSelect
                    mainProps={{
                      handleChange: handleChange,
                      handleBlur: handleBlur,
                      preferences: { key: "id", caption: "caption" },
                      options: entityFields,
                      name: "fieldId",
                      value: fieldFormValues?.fieldId || "",
                      label: "Field",
                    }}
                    helperProps={{
                      fullWidth: true,
                      size: "small",
                      //   className: css.form_control,
                    }}
                  />
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={fieldFormValues?.differingCaption || ""}
                    variant="outlined"
                    size="small"
                    label="differingCaption"
                    name="differingCaption"
                    fullWidth
                  />

                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={fieldFormValues?.sortOrder || ""}
                    variant="outlined"
                    size="small"
                    label="sortOrder"
                    name="sortOrder"
                    fullWidth
                  />
                </div>

                <div className={css.flex_row}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={fieldFormValues?.imageMode || ""}
                    variant="outlined"
                    size="small"
                    label="imageMode"
                    name="imageMode"
                    fullWidth
                  />
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={fieldFormValues?.imageGroupCaption || ""}
                    variant="outlined"
                    size="small"
                    label="imageGroupCaption"
                    name="imageGroupCaption"
                    fullWidth
                  />
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={fieldFormValues?.imageType || ""}
                    variant="outlined"
                    size="small"
                    label="imageType"
                    name="imageType"
                    fullWidth
                  />
                </div>
                <div className={css.flex_row}>
                  <CheckBox
                    label="isReadOnly"
                    name="isReadOnly"
                    checked={fieldFormValues.isReadOnly}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    size={"small"}
                    sx={{
                      width: "100%",
                    }}
                  />
                  <CheckBox
                    label="isDefault"
                    name="isDefault"
                    checked={fieldFormValues.isDefault}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    size={"small"}
                    sx={{
                      width: "100%",
                    }}
                  />

                  <div style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "grab",
            pointerEvents: isDraggedOver ? "none" : "auto",
          }}
        >
          <DragIndicatorIcon />
        </div>
      </Badge>
    </div>
  );
};

const recordViewTemplate = {
  recordViewFieldId: "",
  recordViewId: "",
  fieldId: null,
  differingCaption: "",
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

  const handleDragStart = (e, field, index) => {
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
  const handleDragEnter = (field, index) => {
    draggedOverElementRef.current = { field, index };
  };

  const handleDragEnd = (e, field, index) => {
    let tempFields = [...fields];
    console.log({
      draggedOverField: draggedOverElementRef.current,
      draggingElementRef: draggingElementRef.current,
    });

    if (!draggedOverElementRef.current || !draggingElementRef.current) return;

    const draggingField = draggingElementRef.current.field;
    const draggingFieldIndex = draggingElementRef.current.index;
    const draggedOverFieldIndex = draggedOverElementRef.current.index;

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
                  handleDragStart={handleDragStart}
                  handleDragEnter={handleDragEnter}
                  handleDragEnd={handleDragEnd}
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
