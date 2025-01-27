import { Badge, Card, CardContent, TextField } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoCompleteSelect from "../../common-form-elements/AutoCompleteSelect";

const DraggableRecordViewFunction = ({
  index,
  functionValues,
  workflowsForAutoCompleteSelect,
  changeRecordFunctionValue,
  deleteRecordFunction,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const [functionFormValues, setFunctionFormValues] = useState(functionValues);
  const isDraggedOver = functionFormValues.isDraggedOver;
  const functionID = functionFormValues.recordViewFunctionId;

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFunctionFormValues((prev) => ({ ...prev, [name]: newValue }));
  };
  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    changeRecordFunctionValue(name, newValue, functionID);
  };

  const handleDeleteFunction = (e) => {
    if (e.detail < 2) return;
    deleteRecordFunction(functionID);
  };

  const handleDragStart = (e) => {
    onDragStart(e, functionFormValues, index);
  };

  const handleDragEnter = (e) => {
    onDragEnter(functionFormValues, index);
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: true }));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: false }));
  };
  const handleDragEnd = (e) => {
    onDragEnd(functionFormValues, index);
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: false }));
  };

  useEffect(() => {
    setFunctionFormValues(functionValues);
  }, [functionValues.recordViewFunctionId]);

  return (
    <div
      droppable
      draggable
      style={{
        marginRight: "-15px",
        paddingRight: "10px",

        paddingBlock: isDraggedOver ? "15px" : "5px",
        boxShadow:
          isDraggedOver &&
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        transition: "all 0.2s ease-in-out ",
      }}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
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
            onClick: handleDeleteFunction,
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
        <Card sx={{ width: "100%", backgroundColor: "inherit" }}>
          <CardContent>
            <div className={css.flex_row}>
              <TextField
                value={functionFormValues?.recordViewFunctionId || ""}
                variant="outlined"
                size="small"
                label="ID"
                name="recordViewFunctionId"
              />
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={functionFormValues?.sortOrder || ""}
                variant="outlined"
                size="small"
                label="sortOrder"
                name="sortOrder"
              />
              <AutoCompleteSelect
                mainProps={{
                  handleChange: handleChange,
                  handleBlur: handleBlur,
                  preferences: {
                    key: "id",
                    caption: "path",

                    image: "icon",
                    title: "path",
                  },
                  options: workflowsForAutoCompleteSelect || [],
                  name: "workflowId",
                  value: functionFormValues.workflowId || "",
                  label: "Workflow",
                }}
                helperProps={{
                  size: "small",
                  fullWidth: true,
                }}
              />
            </div>
          </CardContent>
        </Card>
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
export default DraggableRecordViewFunction;
