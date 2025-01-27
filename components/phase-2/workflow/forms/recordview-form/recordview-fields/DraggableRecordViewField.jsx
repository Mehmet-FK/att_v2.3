import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  TextField,
} from "@mui/material";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { useState } from "react";
import AutoCompleteSelect from "../../common-form-elements/AutoCompleteSelect";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckBox from "../../common-form-elements/CheckBox";
import { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

export default DraggableRecordViewField;
