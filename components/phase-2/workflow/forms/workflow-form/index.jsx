import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import css from "@/styles/workflow-forms/workflow-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import IconSelect from "@/components/form-elements/IconSelect";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import CheckBox from "../common-form-elements/CheckBox";
import AutoCompleteSelect from "../common-form-elements/AutoCompleteSelect";

const prepareWorkflowForAutoCompleteSelect = (workflows) => {
  if (!workflows) return [];

  const notDatasetWorkflows = workflows.filter(
    (wf) => wf.launchType !== "0" && wf.launchType !== "1"
  );

  return notDatasetWorkflows.map((wf) => ({
    id: wf.id,
    caption: wf.caption,
    icon: wf.icon,
  }));
};

const WorkflowForm = () => {
  const workflowState = useSelector((state) => state.workflow);
  const workflows = useSelector((state) => state.attensam.data?.workflows);

  const workflowsForAutoCompleteSelect =
    prepareWorkflowForAutoCompleteSelect(workflows);

  const { handleWorkflowBlur } = useWorkflowForms();
  const [workflowFormValues, setWorkflowFormValues] = useState(workflowState);
  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setWorkflowFormValues({
      ...workflowFormValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className={css.form_container}>
      <div className={css.flex_column}>
        <div className={css.flex_row}>
          <TextField
            onChange={handleChange}
            onBlur={handleWorkflowBlur}
            value={workflowFormValues.name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
            style={{ userSelect: "none" }}
          />
          <TextField
            onChange={handleChange}
            onBlur={handleWorkflowBlur}
            value={workflowFormValues.caption || ""}
            variant="outlined"
            size="medium"
            label="Caption"
            name="caption"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            onBlur={handleWorkflowBlur}
            value={workflowFormValues.description || ""}
            variant="outlined"
            size="medium"
            label="Beschreibung"
            name="description"
            fullWidth
          />

          <AutoCompleteSelect
            mainProps={{
              handleChange: handleChange,
              handleBlur: handleWorkflowBlur,
              preferences: { key: "id", caption: "caption" },
              options: workflowsForAutoCompleteSelect,
              name: "parentWorkflowId",
              value: workflowFormValues.parentWorkflowId || "",
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
            handleChange={() => console.log("change")}
            handleBlur={() => console.log("blur")}
            value={workflowFormValues.icon || ""}
          />
          <FormControl className={css.form_control} size="medium">
            <InputLabel id="permissionType">Berechtigungstyp</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="permissionType"
              id="demo-select-permissionType"
              label="Berechtigungstyp"
              name="permissionType"
              value={workflowFormValues.permissionType || ""}
              onChange={handleChange}
              onBlur={handleWorkflowBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {["0", "1"]?.map((perm) => (
                <MenuItem key={perm} value={perm}>
                  {perm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={css.form_control} size="medium">
            <InputLabel id="EntityId">Entität</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="EntityId"
              id="demo-select-small"
              label="Entität"
              name="entityId"
              value={workflowFormValues.entityId || ""}
              onChange={handleChange}
              onBlur={handleWorkflowBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {["entities"]?.map((entity) => (
                <MenuItem key={entity} value={entity}>
                  {entity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <CheckBox
              sx={{
                width: "100%",
              }}
              handleChange={handleChange}
              handleBlur={handleWorkflowBlur}
              name="isActive"
              checked={workflowFormValues.isActive}
              label="isActive"
            />
            <CheckBox
              sx={{
                width: "100%",
              }}
              handleChange={handleChange}
              handleBlur={handleWorkflowBlur}
              name="isProduction"
              checked={workflowFormValues.isProduction}
              label="isProduction"
            />
          </div>
        </div>

        {/* <LaunchElementSection /> */}

        <div className={css.flex_row} style={{ paddingBlock: "10px" }} />
      </div>
    </div>
  );
};

export default WorkflowForm;
