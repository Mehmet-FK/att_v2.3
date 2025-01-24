import { Divider, TextField } from "@mui/material";
import css from "@/styles/workflow-forms/workflow-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import IconSelect from "@/components/form-elements/IconSelect";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import CheckBox from "../common-form-elements/CheckBox";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";
import CustomSelect from "../common-form-elements/CustomSelect";
import LaunchElementForm from "../LaunchElementForm";
import { workflowPermissionTypes } from "@/helpers/Enums";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";

const WorkflowForm = ({
  entitiesForAutoSelect,
  workflowsForAutoCompleteSelect,
}) => {
  const workflowState = useSelector((state) => state.workflow);
  const [workflowFormValues, setWorkflowFormValues] = useState(workflowState);

  const { updateWorkflowValue } = useWorkflowForms();

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

          <AutoCompleteSelect
            mainProps={{
              handleChange: handleChange,
              handleBlur: handleBlur,
              preferences: { key: "id", caption: "caption", image: "icon" },
              options: workflowsForAutoCompleteSelect || [],
              name: "parentWorkflowId",
              value: workflowFormValues?.parentWorkflowId || "",
              label: "Parent Workflow",
            }}
            helperProps={{
              className: css.form_control,
            }}
          />
        </div>
        <div className={css.flex_row}>
          <IconSelect
            size={"medium"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={workflowFormValues?.icon || ""}
          />

          <CustomSelect
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={workflowFormValues?.permissionType || ""}
            label="Berechtigungstyp"
            name="permissionType"
            preferences={{ key: "id", caption: "caption" }}
            options={workflowPermissionTypes}
          />

          <AutoCompleteSelect
            mainProps={{
              handleChange: handleChange,
              handleBlur: handleBlur,
              preferences: { key: "id", caption: "caption" },
              options: entitiesForAutoSelect,
              name: "entityId",
              value: workflowFormValues?.entityId || "",
              label: "Entität",
            }}
            helperProps={{
              className: css.form_control,
              // fullWidth: true,
            }}
          />

          <div className={css.flex_row}>
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
        </div>

        {/* <LaunchElementSection /> */}

        <div className={css.flex_row} style={{ paddingBlock: "5px" }} />
        <Divider />
        <div className={css.flex_row} style={{ paddingBlock: "5px" }} />

        <LaunchElementForm />
      </div>
    </div>
  );
};

export default WorkflowForm;
