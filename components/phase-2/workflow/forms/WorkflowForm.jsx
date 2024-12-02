import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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

const WorkflowSection = () => {
  return (
    <div className={css.form_container}>
      <div className={css.flex_column}>
        <div className={css.flex_row}>
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={stepValues.name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
          />
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={stepValues.caption || ""}
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
              // value={stepValues?.entityId || ""}
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
              // value={stepValues?.entityId || ""}
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
              // value={stepValues?.entityId || ""}
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
            //   value={stepValues.name || ""}
            variant="outlined"
            size="medium"
            label="Launch Element Name"
            name="launchElementName"
            fullWidth
          />
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={stepValues.caption || ""}
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
                //   value={stepValues.name || ""}
                variant="outlined"
                size="medium"
                label="Name"
                name="launchElementName"
                fullWidth
              />
              <TextField
                //   onChange={handleChange}
                //   onBlur={handleStepBlur}
                //   value={stepValues.caption || ""}
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
                  // value={stepValues?.entityId || ""}
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
  return (
    <div className={css.form_container}>
      <div className={css.flex_column}>
        <div className={css.flex_row}>
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={stepValues.name || ""}
            variant="outlined"
            size="medium"
            label="Name"
            name="name"
            fullWidth
          />
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={stepValues.caption || ""}
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
              // value={stepValues?.entityId || ""}
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
              // value={stepValues?.entityId || ""}
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
              // value={stepValues?.entityId || ""}
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

        <LaunchElementSection />

        <div className={css.flex_row}>
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={stepValues.name || ""}
            variant="outlined"
            size="medium"
            label="Launch Element Name"
            name="launchElementName"
            fullWidth
          />
          <TextField
            //   onChange={handleChange}
            //   onBlur={handleStepBlur}
            //   value={stepValues.caption || ""}
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

export default WorkflowForm;
