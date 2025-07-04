import TextField from "@mui/material/TextField";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { useState, useEffect, useRef } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Accordion from "@/components/ui-components/Accordion";
import DragItemContainer from "@/components/ui-components/DragItemContainer";
import CheckBox from "@/components/ui-components/CheckBox";
import CustomSelect from "@/components/ui-components/CustomSelect";
import ElementBadge from "@/components/ui-components/ElementBadge";

const DraggableRecordViewField = ({
  index,
  recordViewField,
  entityFields,
  openConfirmModalToDelete,
  changeRecordFieldValue,
  changeRecordFieldTotally,
  dragUtils,
}) => {
  const [fieldFormValues, setFieldFormValues] = useState({
    ...recordViewField,
    sortOrder: index,
  });
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const handleFieldInputChange = (e) => {
    const fieldID = e.target.value;

    const selectedField = entityFields?.find((field) => field.id === fieldID);
    if (!selectedField) return;
    const tempField = {
      ...fieldFormValues,
      fieldId: fieldID,
      caption: selectedField.fieldCaption,
      groupname: selectedField.fieldGroupName,
    };
    setFieldFormValues(tempField);
    changeRecordFieldTotally(tempField);
  };

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFieldFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    let newValue = value;
    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = Number(value);
    }
    changeRecordFieldValue(name, newValue, fieldFormValues.recordViewFieldId);
  };

  const handleDeleteField = (e) => {
    openConfirmModalToDelete(fieldFormValues);
  };

  const { onDragStart, onDragEnter, onDragEnd } = dragUtils;

  const handleDragStart = (e) => {
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

  const isDraggedOver = fieldFormValues.isDraggedOver;

  const accordionHeader = fieldFormValues?.fieldId
    ? `${fieldFormValues.caption} (Feld ID: ${fieldFormValues.fieldId})`
    : fieldFormValues?.differingCaption ||
      (fieldFormValues?.imageType ? fieldFormValues?.imageType : "Neues Feld");

  return (
    <DragItemContainer
      title={"RecordField ID: " + fieldFormValues?.recordViewFieldId}
      isDraggedOver={isDraggedOver}
      handleDragStart={handleDragStart}
      handleDragEnter={handleDragEnter}
      handleDragLeave={handleDragLeave}
      handleDragEnd={handleDragEnd}
    >
      <ElementBadge
        handleClickOnBadge={handleDeleteField}
        containerSx={{
          pointerEvents: isDraggedOver ? "none" : "auto",
          backgroundColor: "#0000",
        }}
      >
        <Accordion
          accordionProps={{
            expanded: accordionExpanded,
            onChange: () => setAccordionExpanded(!accordionExpanded),
            sx: {
              width: "100%",
              backgroundColor: "inherit",
              borderRadius: "inherit",

              pointerEvents: isDraggedOver ? "none" : "auto",
            },
          }}
          headerProps={{
            sx: { fontSize: "smaller", paddingBlock: "0" },
            className: "drag-image-element",
          }}
          header={accordionHeader}
        >
          <div className={css.flex_row} style={{ alignItems: "center" }}>
            <div className={css.flex_column}>
              <div className={css.flex_row}>
                <CustomSelect
                  handleChange={handleFieldInputChange}
                  // handleBlur={handleBlur}
                  value={fieldFormValues?.fieldId || ""}
                  label="Feld"
                  name="fieldId"
                  preferences={{ key: "id", caption: "caption" }}
                  options={entityFields || []}
                  size="small"
                />
                <TextField
                  value={fieldFormValues?.caption || ""}
                  variant="outlined"
                  size="small"
                  label="Caption"
                  name="caption"
                  disabled
                  fullWidth
                />
                <TextField
                  value={fieldFormValues?.groupname || ""}
                  variant="outlined"
                  size="small"
                  label="Gruppenname"
                  name="groupname"
                  disabled
                  fullWidth
                />
              </div>
              <div className={css.flex_row}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={fieldFormValues?.differingCaption || null}
                  variant="outlined"
                  size="small"
                  label="differingCaption"
                  name="differingCaption"
                  fullWidth
                />
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={fieldFormValues?.differingGroupName || null}
                  variant="outlined"
                  size="small"
                  label="differingGroupName"
                  name="differingGroupName"
                  fullWidth
                />

                <TextField
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  value={fieldFormValues?.sortOrder || null}
                  variant="outlined"
                  size="small"
                  label="sortOrder"
                  name="sortOrder"
                  fullWidth
                  disabled
                />
              </div>
              <div className={css.flex_row}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={fieldFormValues?.imageMode || ""}
                  type="number"
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
    </DragItemContainer>
  );
};

export default DraggableRecordViewField;
