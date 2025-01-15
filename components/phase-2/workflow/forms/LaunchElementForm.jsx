import css from "@/styles/workflow-forms/workflow-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";

const LaunchElementForm = () => {
  const { launchElements } = useSelector((state) => state.workflow);

  const { updateLaunchElementValue, updateWorkflowStepValue } =
    useWorkflowForms();

  const launchElement = launchElements.length > 0 ? launchElements[0] : null;
  const [launchElementValues, setLaunchElementValues] = useState(launchElement);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaunchElementValues({ ...launchElementValues, [name]: value });
  };

  const handleBlur = (e) => {
    const launchElementId = launchElement?.launchElementId;
    const { name, value } = e.target;
    updateLaunchElementValue(name, value, launchElementId);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    const stepID = launchElement?.workflowStepId;
    updateWorkflowStepValue(name, value, stepID);
    handleBlur(e);
  };

  useEffect(() => {
    setLaunchElementValues(launchElement);
    console.log(launchElement);
  }, [launchElement?.launchElementId]);

  return (
    <div className={css.flex_row}>
      {launchElement && (
        <>
          <TextField
            onChange={handleChange}
            onBlur={handleWorkflowStepBlur}
            value={launchElementValues?.name || ""}
            variant="outlined"
            size="medium"
            label="Start Element Name"
            name="name"
            disabled={!launchElement}
            fullWidth
          />
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={launchElementValues?.description || ""}
            variant="outlined"
            size="medium"
            label="Start Element Beschreibung"
            name="description"
            disabled={!launchElement}
            fullWidth
          />
          <div style={{ width: "100%" }} />
          <div style={{ width: "100%" }} />
        </>
      )}
    </div>
  );
};

export default LaunchElementForm;
