import { Badge, Card, CardContent, TextField } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import AutoCompleteSelect from "../../common-form-elements/AutoCompleteSelect";
import ElementBadge from "../../common-form-elements/ElementBadge";
import DragItemContainer from "../../common-form-elements/DragItemContainer";

const DraggableRecordViewFunction = ({
  index,
  functionValues,
  workflowsForAutoCompleteSelect,
  changeRecordFunctionValue,
  openConfirmModalToDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const [functionFormValues, setFunctionFormValues] = useState(functionValues);
  const isDraggedOver = functionFormValues.isDraggedOver;
  const functionID = functionFormValues.recordViewFunctionId;

  const handleWorkflowIDChange = (workflowID) => {
    const selectedWorkflow = workflowsForAutoCompleteSelect?.find(
      (wf) => wf.id === workflowID
    );
    setFunctionFormValues((prev) => ({
      ...prev,
      workflowId: workflowID,
      functionCaption: selectedWorkflow?.caption || "",
    }));
  };
  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    if (name === "workflowId") {
      handleWorkflowIDChange(value);
    } else {
      setFunctionFormValues((prev) => ({ ...prev, [name]: newValue }));
    }
  };
  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    changeRecordFunctionValue(name, newValue, functionID);
  };

  const handleDeleteFunction = (e) => {
    openConfirmModalToDelete(functionFormValues);
  };

  const handleDragStart = (e) => {
    onDragStart(e, functionFormValues, index);
  };

  const handleDragEnter = (e) => {
    onDragEnter(functionFormValues, index);
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: true }));
  };

  const handleDragLeave = (e) => {
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: false }));
  };
  const handleDragEnd = (e) => {
    onDragEnd(e, functionFormValues, index);
    setFunctionFormValues((prev) => ({ ...prev, isDraggedOver: false }));
  };

  useEffect(() => {
    setFunctionFormValues(functionValues);
  }, [functionValues.recordViewFunctionId]);

  useEffect(() => {
    handleWorkflowIDChange(functionFormValues?.workflowId);
  }, [functionFormValues?.workflowId]);

  return (
    <DragItemContainer
      isDraggedOver={isDraggedOver}
      handleDragStart={handleDragStart}
      handleDragEnter={handleDragEnter}
      handleDragLeave={handleDragLeave}
      handleDragEnd={handleDragEnd}
    >
      <ElementBadge
        handleClickOnBadge={handleDeleteFunction}
        containerSx={{
          pointerEvents: isDraggedOver ? "none" : "auto",
          backgroundColor: "#0000",

          borderRadius: "inherit",
        }}
      >
        <Card
          sx={{
            width: "100%",
            backgroundColor: "#0000",
            borderRadius: "inherit",
          }}
          className="drag-image-element"
        >
          <CardContent>
            <div className={css.flex_row}>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={functionFormValues?.sortOrder || ""}
                variant="outlined"
                size="small"
                label="sortOrder"
                name="sortOrder"
              />
              <TextField
                value={functionFormValues?.functionCaption || ""}
                variant="outlined"
                size="small"
                label="Caption"
                name="functionCaption"
                disabled
                fullWidth
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
                    filterKeys: ["id", "caption", "path"],
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
      </ElementBadge>
    </DragItemContainer>

    // </div>
  );
};
export default DraggableRecordViewFunction;
