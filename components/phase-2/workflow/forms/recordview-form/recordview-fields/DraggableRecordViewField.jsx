import TextField from "@mui/material/TextField";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { useState, useEffect, useRef } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckBox from "../../common-form-elements/CheckBox";
import CustomSelect from "../../common-form-elements/CustomSelect";
import Accordion from "@/components/ui-components/Accordion";
import ElementBadge from "../../common-form-elements/ElementBadge";
import DragItemContainer from "../../common-form-elements/DragItemContainer";

const DraggableRecordViewField = ({
  index,
  recordViewField,
  entityFields,
  openConfirmModalToDelete,
  changeRecordFieldValue,
  dragUtils,
}) => {
  const [fieldFormValues, setFieldFormValues] = useState(recordViewField);
  const [accordionExpanded, setAccordionExpanded] = useState(false);

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

  const handleFieldInputChange = (e) => {
    const fieldID = e.target.value;

    const selectedField = entityFields?.find((field) => field.id === fieldID);
    console.log(selectedField);
    if (!selectedField) return;
    setFieldFormValues((prev) => ({
      ...prev,
      fieldId: fieldID,
      caption: selectedField.fieldCaption,
      groupName: selectedField.fieldGroupName,
    }));
    changeRecordFieldValue(
      "caption",
      selectedField.fieldCaption,
      fieldFormValues.recordViewFieldId
    );
    changeRecordFieldValue(
      "groupName",
      selectedField.fieldGroupName,
      fieldFormValues.recordViewFieldId
    );
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
    console.log({ fieldFormValues });
    openConfirmModalToDelete(fieldFormValues);
  };

  // useEffect(() => {
  //   setFieldFormValues((prev) => ({ ...prev, ...recordViewField }));
  // }, [recordViewField.fieldId]);

  // useEffect(() => {
  //   handleFieldInputChange(fieldFormValues?.fieldId);
  // }, [fieldFormValues?.fieldId]);

  const isDraggedOver = fieldFormValues.isDraggedOver;

  const accordionHeader = fieldFormValues?.fieldId
    ? `${fieldFormValues.caption} (Feld ID: ${fieldFormValues.fieldId})`
    : fieldFormValues?.differingCaption ||
      (fieldFormValues?.imageType ? fieldFormValues?.imageType : "Neues Feld");

  useEffect(() => {
    console.log(fieldFormValues);
  }, []);

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
                  handleBlur={handleBlur}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={fieldFormValues?.sortOrder || null}
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
