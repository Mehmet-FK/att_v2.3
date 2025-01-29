import TextField from "@mui/material/TextField";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { useState, useEffect, useRef } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckBox from "../../common-form-elements/CheckBox";
import CustomSelect from "../../common-form-elements/CustomSelect";
import Accordion from "@/components/ui-components/Accordion";
import ElementBadge from "../../common-form-elements/ElementBadge";

const DraggableRecordViewField = ({
  index,
  recordViewField,
  entityFields,
  openConfirmModalToDelete,
  changeRecordFieldValue,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const [fieldFormValues, setFieldFormValues] = useState(recordViewField);
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const dropTimeoutRef = useRef(null);

  const handleDragStart = (e) => {
    setAccordionExpanded(false);
    onDragStart(e, fieldFormValues, index);
  };
  const handleDragEnter = (e) => {
    onDragEnter(fieldFormValues, index);
    setFieldFormValues((prev) => ({ ...prev, isDraggedOver: true }));
  };
  const handleDragLeave = (e) => {
    setFieldFormValues((prev) => ({ ...prev, isDraggedOver: false }));
  };
  const handleDragEnd = (e) => {
    onDragEnd(e, fieldFormValues, index);
  };
  const handleDrop = (e) => {
    if (dropTimeoutRef.current) {
      clearTimeout(dropTimeoutRef.current);
    }
    dropTimeoutRef.current = setTimeout(() => {
      setFieldFormValues((prev) => ({ ...prev, isDraggedOver: false }));
      dropTimeoutRef.current = null;
    }, 300);
  };

  const handleFieldInputChange = (fieldID) => {
    const selectedField = entityFields?.find((field) => field.id === fieldID);
    if (!selectedField) return;
    setFieldFormValues((prev) => ({
      ...prev,
      fieldId: fieldID,
      fieldCaption: selectedField.fieldCaption,
      groupName: selectedField.fieldGroupName,
    }));
  };

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
    console.log({ fieldFormValues });
    openConfirmModalToDelete(fieldFormValues);
  };

  useEffect(() => {
    setFieldFormValues(recordViewField);
  }, [recordViewField.fieldId]);

  useEffect(() => {
    handleFieldInputChange(fieldFormValues?.fieldId);
  }, [fieldFormValues?.fieldId]);

  const isDraggedOver = fieldFormValues.isDraggedOver;

  const accordionHeader = fieldFormValues?.fieldId
    ? `${fieldFormValues.fieldCaption} (Feld ID: ${fieldFormValues.fieldId})`
    : fieldFormValues?.differingCaption ||
      (fieldFormValues?.imageType ? fieldFormValues?.imageType : "Neues Feld");

  return (
    <div
      droppable
      draggable
      className={css.flex_row}
      title={"RecordField ID: " + fieldFormValues?.recordViewFieldId}
      style={{
        marginRight: "-15px",
        paddingLeft: "5px",
        paddingRight: "10px",
        paddingBlock: isDraggedOver ? "15px" : "5px",
        borderBlock: isDraggedOver && "1px solid #ccc",
        transition: "all 0.2s ease-in-out ",
      }}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <ElementBadge
        handleClickOnBadge={handleDeleteField}
        containerSx={{ pointerEvents: isDraggedOver ? "none" : "auto" }}
      >
        <Accordion
          accordionProps={{
            expanded: accordionExpanded,
            onChange: () => setAccordionExpanded(!accordionExpanded),
            sx: {
              width: "100%",
              backgroundColor: "inherit",
              pointerEvents: isDraggedOver ? "none" : "auto",
            },
          }}
          headerProps={{ sx: { fontSize: "smaller", paddingBlock: "0" } }}
          header={accordionHeader}
        >
          <div className={css.flex_row} style={{ alignItems: "center" }}>
            <div className={css.flex_column}>
              <div className={css.flex_row}>
                <CustomSelect
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={fieldFormValues?.fieldId || ""}
                  label="Feld"
                  name="fieldId"
                  preferences={{ key: "id", caption: "caption" }}
                  options={entityFields || []}
                  size="small"
                />
                <TextField
                  value={fieldFormValues?.fieldCaption || ""}
                  variant="outlined"
                  size="small"
                  label="Caption"
                  name="fieldCaption"
                  disabled
                  fullWidth
                />
                <TextField
                  value={fieldFormValues?.groupName || ""}
                  variant="outlined"
                  size="small"
                  label="Gruppenname"
                  name="groupName"
                  disabled
                  fullWidth
                />
              </div>
              <div className={css.flex_row}>
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
                  value={fieldFormValues?.differingGroupName || ""}
                  variant="outlined"
                  size="small"
                  label="differingGroupName"
                  name="differingGroupName"
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
      </ElementBadge>
    </div>
  );
};

export default DraggableRecordViewField;
