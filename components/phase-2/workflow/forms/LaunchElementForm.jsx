import css from "@/styles/workflow-forms/workflow-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useSelector } from "react-redux";
import { useState } from "react";
import { TextField } from "@mui/material";

const LaunchElementForm = () => {
  return (
    <div className={css.flex_row}>
      <TextField
        onChange={handleChange}
        onBlur={handleWorkflowBlur}
        value={workflowFormValues.name || ""}
        variant="outlined"
        size="medium"
        label="Launch Element Name"
        name="launchElementName"
        fullWidth
      />
      <TextField
        onChange={handleChange}
        onBlur={handleWorkflowBlur}
        value={workflowFormValues.caption || ""}
        variant="outlined"
        size="medium"
        label="Launch Element Beschreibung"
        name="launchElementDescription"
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
