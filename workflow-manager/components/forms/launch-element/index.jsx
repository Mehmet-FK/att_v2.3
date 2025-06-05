import css from "@/styles/workflow-forms-styles/workflow-form.module.css";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";
import ViewHeaderForm from "../header";
import { workflowStepTypeIds } from "@/helpers/Constants";

const LaunchElementForm = ({ entityId }) => {
  const launchElements = useSelector((state) => state.workflow.launchElements);
  const entities = useSelector((state) => state.attensam.data?.entities);

  const {
    updateLaunchElementValue,
    updateWorkflowStepValue,
    prepareEntityFields,
  } = useWorkflowForms();

  const launchElement = launchElements.length > 0 ? launchElements[0] : null;
  const [launchElementValues, setLaunchElementValues] = useState(launchElement);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaunchElementValues({ ...launchElementValues, [name]: value });
  };

  const handleBlur = (e) => {
    const stepID = launchElement?.workflowStepId;
    const { name, value } = e.target;
    updateLaunchElementValue(name, value, stepID);
  };

  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    const stepID = launchElement?.workflowStepId;
    updateWorkflowStepValue(name, value, stepID);
    handleBlur(e);
  };

  const entityFields = useMemo(
    () => prepareEntityFields(entities, entityId),
    [entityId, entities]
  );

  useEffect(() => {
    setLaunchElementValues(launchElement);
  }, [launchElement?.launchElementId]);

  return (
    <>
      {launchElement && (
        <div className={css.form_container}>
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
        </div>
      )}
      {launchElement?.launchType === 4 && (
        <div className={css.header_form_wrapper}>
          <ViewHeaderForm
            viewId={launchElement?.launchElementId}
            viewType={workflowStepTypeIds.LAUNCH_WORKFLOW}
            entityFields={entityFields}
            defaultExpanded={false}
          />
        </div>
      )}
    </>
  );
};

export default LaunchElementForm;
