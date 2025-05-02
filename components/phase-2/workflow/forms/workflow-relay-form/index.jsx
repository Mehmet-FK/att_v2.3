import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import css from "@/styles/workflow-forms-styles/workflow-relay-form.module.css";
import { TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";

const WorkflowRelayForm = ({ stepID, workflowStepValues }) => {
  const workflowRelays = useSelector((state) => state.workflow?.workflowRelays);
  const workflowHubs = useSelector(
    (state) => state.attensam.data?.workflowHubs
  );

  const workflowRelay = useMemo(
    () => workflowRelays.find((wfr) => wfr.workflowStepId === stepID),
    [stepID]
  );

  const [relayValues, setRelayValues] = useState({
    ...workflowRelay,
    name: workflowStepValues?.name,
  });

  const { updateWorkflowRelayValue, updateWorkflowStepValue } =
    useWorkflowForms();

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setRelayValues({
      ...relayValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;

    const relayId = workflowRelay?.workflowRelayId;
    const inputValue = JSON.stringify(value);
    updateWorkflowRelayValue(name, inputValue, relayId);
  };
  const handleWorkflowStepBlur = (e) => {
    const { name, value } = e.target;
    updateWorkflowStepValue(name, value, stepID);
  };

  return (
    <div className={css.form_container}>
      <div className={css.flex_column}>
        <div className={css.flex_row}>
          <TextField
            onChange={handleChange}
            onBlur={handleWorkflowStepBlur}
            value={relayValues?.name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
          />
          <AutoCompleteSelect
            mainProps={{
              handleChange: handleChange,
              handleBlur: handleBlur,
              preferences: {
                key: "workflowHubStepId",
                caption: "launchElementName",
              },
              options: workflowHubs,
              name: "workflowHubStepId",
              value: relayValues?.workflowHubStepId,
              label: "Workflow Hub",
            }}
            helperProps={{
              className: css.form_control,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowRelayForm;
