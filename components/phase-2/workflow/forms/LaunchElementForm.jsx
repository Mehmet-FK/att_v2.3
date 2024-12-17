import css from "@/styles/workflow-forms/workflow-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { TextField } from "@mui/material";

const LaunchElementForm = () => {
  const { launchElements } = useSelector((state) => state.workflow);

  const launchElement = launchElements.length > 0 ? launchElements[0] : {};

  const [launchElementValues, setLaunchElementValues] = useState(launchElement);

  const { updateLaunchElementValue } = useWorkflowForms();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaunchElementValues({ ...launchElementValues, [name]: value });
  };

  const handleBlur = (e) => {
    const launchElementId = launchElement?.launchElementId;
    const { name, value } = e.target;
    updateLaunchElementValue(name, value, launchElementId);
  };
  return (
    <div className={css.flex_row}>
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        value={launchElementValues?.name || ""}
        variant="outlined"
        size="medium"
        label="Start Element Name"
        name="name"
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
        fullWidth
      />

      <div style={{ visibility: "hidden", width: "100%" }}>
        THIS DIV WILL NOT APPEAR IN DOM IT IS JUST A PLACEHOLDER
      </div>
      <div style={{ visibility: "hidden", width: "100%" }}>
        THIS DIV WILL NOT APPEAR IN DOM IT IS JUST A PLACEHOLDER
      </div>
    </div>
  );
};

export default LaunchElementForm;
