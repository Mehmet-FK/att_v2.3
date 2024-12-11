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
import IconSelect from "@/components/form-elements/IconSelect";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useSelector } from "react-redux";
import { useState } from "react";

const WorkflowSection = () => {
  return (
    <div className={css.form_container}>
      <div className={css.flex_column}>
        <div className={css.flex_row}>
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
          />
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={caption || ""}
            variant="outlined"
            size="medium"
            label="Caption"
            name="caption"
            fullWidth
          />
          <IconSelect
            size={"medium"}
            handleChange={() => console.log("change")}
            handleBlur={() => console.log("blur")}
          />
        </div>
        <div className={css.flex_row}>
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
              // value={entityId || ""}
              // onChange={handleChange}
              // onBlur={handleStepBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {["entities"]?.map((entity) => (
                <MenuItem value={entity}>{entity}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={css.form_control} size="medium">
            <InputLabel id="ParentWorkflowId">Parent Workflow</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="ParentWorkflowId"
              id="demo-select-small"
              label="Parent Workflow"
              name="parentWorkflowId"
              // value={entityId || ""}
              // onChange={handleChange}
              // onBlur={handleStepBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {["entities"]?.map((entity) => (
                <MenuItem value={entity}>{entity}</MenuItem>
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
              // value={entityId || ""}
              // onChange={handleChange}
              // onBlur={handleStepBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {["entities"]?.map((entity) => (
                <MenuItem value={entity}>{entity}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={css.flex_row}>
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={name || ""}
            variant="outlined"
            size="medium"
            label="Launch Element Name"
            name="launchElementName"
            fullWidth
          />
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={caption || ""}
            variant="outlined"
            size="medium"
            label="Launch Element Beschreibung"
            name="launchElementDescription"
            fullWidth
          />
          <div style={{ visibility: "hidden", width: "100%" }}>
            THIS DIV WILL NOT APPEAR IN DOM IT IS JUST A PLACEHOLDER
          </div>
        </div>
      </div>
    </div>
  );
};

const LaunchElementSection = () => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        sx={{ fontSize: "smaller", paddingBlock: "0" }}
        expandIcon={<ExpandMoreIcon fontSize="small" />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Start Element
      </AccordionSummary>
      <AccordionDetails>
        <div className={css.form_container}>
          <div className={css.flex_column}>
            <div className={css.flex_row}>
              <TextField
                //   onChange={handleChange}
                //   onBlur={handleStepBlur}
                //   value={name || ""}
                variant="outlined"
                size="medium"
                label="Name"
                name="launchElementName"
                fullWidth
              />
              <TextField
                //   onChange={handleChange}
                //   onBlur={handleStepBlur}
                //   value={caption || ""}
                variant="outlined"
                size="medium"
                label="Beschreibung"
                name="launchElementDescription"
                fullWidth
              />
              <FormControl className={css.form_control} size="medium">
                <InputLabel id="launchElementType">
                  Start Element Typ
                </InputLabel>
                <Select
                  MenuProps={{
                    style: { zIndex: 35001 },
                  }}
                  labelId="launchElementType"
                  id="demo-select-launchElementType"
                  label="Start Element Typ"
                  name="launchElementType"
                  // value={entityId || ""}
                  // onChange={handleChange}
                  // onBlur={handleStepBlur}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {["entities"]?.map((entity) => (
                    <MenuItem value={entity}>{entity}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const WorkflowForm = () => {
  // const {
  //   name,
  //   caption,
  //   entityId,
  //   description,
  //   icon,
  //   isActive,
  //   isProduction,
  //   permissionType,
  //   parentWorkflowId,
  // }

  const workflowState = useSelector((state) => state.workflow);

  const { handleWorkflowBlur } = useWorkflowForms();
  const [workflowFormValues, setWorkflowFormValues] = useState({
    entityId: workflowState?.entityId || "",
    name: workflowState?.name || "",
    caption: workflowState?.caption || "",
    description: workflowState?.description || "",
    icon: workflowState?.icon || "",
    isActive: workflowState?.isActive || true,
    isProduction: workflowState?.isProduction || false,
    permissionType: workflowState?.permissionType || "0",
    parentWorkflowId: workflowState?.parentWorkflowId || "",
  });
  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    console.log;
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
          <FormControl className={css.form_control} size="medium">
            <InputLabel id="ParentWorkflowId">Parent Workflow</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 35001 },
              }}
              labelId="ParentWorkflowId"
              id="demo-select-small"
              label="Parent Workflow"
              name="parentWorkflowId"
              value={workflowFormValues.parentWorkflowId || ""}
              onChange={handleChange}
              onBlur={handleWorkflowBlur}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {["entities"]?.map((entity) => (
                <MenuItem value={entity}>{entity}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={css.flex_row}>
          <IconSelect
            size={"medium"}
            handleChange={() => console.log("change")}
            handleBlur={() => console.log("blur")}
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
                <MenuItem value={perm}>{perm}</MenuItem>
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
                <MenuItem value={entity}>{entity}</MenuItem>
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
            <FormControlLabel
              onChange={handleChange}
              onBlur={handleWorkflowBlur}
              sx={{
                width: "100%",
              }}
              control={
                <Checkbox
                  name="isActive"
                  checked={workflowFormValues.isActive}
                />
              }
              label={<span style={{ fontSize: "smaller" }}>isActive</span>}
              labelPlacement="end"
            />
            <FormControlLabel
              onChange={handleChange}
              onBlur={handleWorkflowBlur}
              sx={{
                width: "100%",
              }}
              control={
                <Checkbox
                  name="isProduction"
                  checked={workflowFormValues.isProduction}
                />
              }
              label={<span style={{ fontSize: "smaller" }}>isProduction</span>}
              labelPlacement="end"
            />
          </div>
        </div>

        {/* <LaunchElementSection /> */}

        <div className={css.flex_row} style={{ paddingBlock: "10px" }} />
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
      </div>
    </div>
  );
};

export default WorkflowForm;
