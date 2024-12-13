import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";

const scannerActions = [
  { value: 1, caption: "Online Suche" },
  { value: 0, caption: "Entität Suche" },
];

const ScannerDialogFormBase = ({ scannerDialog, viewId, children }) => {
  const [scannerDialogValues, setScannerDialogValues] = useState(scannerDialog);

  const { updateScannerDialogValue } = useWorkflowForms();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setScannerDialogValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    updateScannerDialogValue(name, inputValue, viewId);
  };

  useEffect(() => {
    setScannerDialogValues(scannerDialogValues);
  }, [viewId]);

  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={scannerDialogValues?.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="name"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={scannerDialogValues?.description || ""}
              variant="outlined"
              size="medium"
              label="Beschreibung"
              name="description"
              fullWidth
            />
            <FormControl className={css.form_control} size="medium">
              <InputLabel id="EntityId">Entität</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="EntityId"
                id="demo-select-small"
                value={scannerDialogValues?.entityId || ""}
                label="Entität"
                name="entityId"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {["entity"]?.map((entity) => (
                  <MenuItem key={entity} value={entity}>
                    {entity}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={css.form_control} size="medium">
              <InputLabel id="targetFiedId">targetFiedId</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="targetFiedId"
                id="demo-select-small"
                value={scannerDialogValues?.targetFiedId || ""}
                label="targetFiedId"
                name="targetFiedId"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {["entity"]?.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={css.form_control} size="medium">
              <InputLabel id="scannerActions">Scanner Aktion</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="scannerAction"
                id="scannerAction-select-small"
                value={scannerDialogValues?.scannerAction || 0}
                label="Scanner Aktion"
                name="scannerAction"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {scannerActions?.map((action) => (
                  <MenuItem key={action.value} value={action.value}>
                    {action.caption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={css.form_control} size="medium">
              <InputLabel id="inputDataSourceId">
                Manuelle Eingabe Workflow
              </InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="inputDataSourceId"
                id="inputDataSourceId-select-small"
                value={scannerDialogValues?.inputDataSourceId || 0}
                label="Manuelle Eingabe Workflow"
                name="inputDataSourceId"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {scannerActions?.map((action) => (
                  <MenuItem key={action.value} value={action.value}>
                    {action.caption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={css.form_control} size="medium">
              <InputLabel id="filterField">Filter Feld</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 35001 },
                }}
                labelId="filterField"
                id="filterField-select-small"
                value={scannerDialogValues?.filterField || ""}
                label="Filter Feld"
                name="filterField"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {scannerActions?.map((field) => (
                  <MenuItem key={field.value} value={field.value}>
                    {field.caption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={css.flex_row} style={{ width: "50%" }}>
              {/* <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={scannerDialogValues?.isEditable}
                label="isEditable"
                name="isEditable"
                sx={{
                  width: "100%",
                }}
              />

              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={scannerDialogValues?.showMenue}
                label="showMenue"
                name="showMenue"
                sx={{
                  width: "100%",
                }}
              />

              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={scannerDialogValues?.createNewDataset}
                label="createNewDataset"
                name="createNewDataset"
                sx={{
                  width: "100%",
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className={css.header_form_wrapper}>{children}</div>
    </>
  );
};

export default ScannerDialogFormBase;
