import { Button, Divider, IconButton, TextField } from "@mui/material";
import css from "@/styles/workflow-forms-styles/workflow-form.module.css";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import IconSelect from "@/components/form-elements/IconSelect";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import LaunchElementForm from "../launch-element";
import { workflowPermissionTypes } from "@/helpers/Enums";
import { useAutoCompleteEntities } from "@/context/AutoCompleteEntityContext";
import { useAutoCompleteWorkflows } from "@/context/AutoCompleteWorkflowContext";
import CheckBox from "@/components/ui-components/CheckBox";
import AutoCompleteSelect from "@/components/ui-components/AutoCompleteSelect";
import CustomSelect from "@/components/ui-components/CustomSelect";

const WorkflowForm = ({}) => {
  const workflowState = useSelector((state) => state.workflow);

  const [workflowFormValues, setWorkflowFormValues] = useState(workflowState);
  const { updateWorkflowValue } = useWorkflowForms();

  const { autoCompleteEntities } = useAutoCompleteEntities();
  const { autoCompleteWorkflows } = useAutoCompleteWorkflows();

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setWorkflowFormValues({
      ...workflowFormValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlur = (e) => {
    const { value, name, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    updateWorkflowValue(name, inputValue);
  };

  useEffect(() => {
    setWorkflowFormValues(workflowState);
  }, [workflowState]);
  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={workflowFormValues?.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="name"
              fullWidth
              style={{ userSelect: "none" }}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={workflowFormValues?.caption || ""}
              variant="outlined"
              size="medium"
              label="Caption"
              name="caption"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={workflowFormValues?.description || ""}
              variant="outlined"
              size="medium"
              label="Beschreibung"
              name="description"
              fullWidth
            />
            <CheckBox
              sx={{
                width: "50%",
              }}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name="isActive"
              checked={workflowFormValues?.isActive || false}
              label="isActive"
            />
          </div>
          <div className={css.flex_row}>
            <div
              className={css.flex_row}
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconSelect
                handleChange={handleChange}
                handleBlur={handleBlur}
                name="icon"
                value={workflowFormValues?.icon}
                label="Icon"
                fullWidth={true}
                showUpload={true}
                helperProps={{
                  className: css.form_control,
                }}
              />
            </div>

            <AutoCompleteSelect
              mainProps={{
                handleChange: handleChange,
                handleBlur: handleBlur,
                preferences: {
                  key: "id",
                  caption: "caption",
                  image: "icon",
                  title: "path",
                  filterKeys: ["id", "caption", "path"],
                },
                options: autoCompleteWorkflows || [],
                name: "parentWorkflowId",
                value: workflowFormValues?.parentWorkflowId || "",
                label: "Parent Workflow",
              }}
              helperProps={{
                className: css.form_control,
              }}
            />
            <AutoCompleteSelect
              mainProps={{
                handleChange: handleChange,
                handleBlur: handleBlur,
                preferences: {
                  key: "id",
                  caption: "caption",
                  filterKeys: ["id", "caption", "name"],
                },
                options: autoCompleteEntities,
                name: "entityId",
                value: workflowFormValues?.entityId,
                label: "Entität",
              }}
              helperProps={{
                className: css.form_control,
                // fullWidth: true,
              }}
            />

            <CheckBox
              sx={{
                width: "50%",
              }}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name="isProduction"
              checked={workflowFormValues?.isProduction || false}
              label="isProduction"
            />
          </div>

          <div className={css.flex_row} style={{ paddingBlock: "5px" }} />
          <Divider />
        </div>
      </div>
      <LaunchElementForm entityId={workflowFormValues?.entityId} />
    </>
  );
};

export default WorkflowForm;
