import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import ViewHeaderForm from "../header-form";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import CheckBox from "../common-form-elements/CheckBox";

const RecordViewForm = ({ stepID }) => {
  const { recordViews } = useSelector((state) => state.workflow);

  const viewId = stepID + "-recordview";

  const recordView = useMemo(
    () => recordViews.find((rv) => rv.recordViewId === viewId),
    [stepID]
  );

  const [recordViewValues, setRecordViewValues] = useState(recordView);

  const { updateRecordViewValue } = useWorkflowForms();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecordViewValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    updateRecordViewValue(name, inputValue, viewId);
  };

  useEffect(() => {
    setRecordViewValues(recordView);
  }, [stepID]);

  return (
    <>
      <div className={css.form_container}>
        <div className={css.flex_column}>
          <div className={css.flex_row}>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={recordViewValues.name || ""}
              variant="outlined"
              size="medium"
              label="Name"
              name="name"
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
                value={recordViewValues?.entityId || ""}
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
            <div className={css.flex_row} style={{ width: "50%" }}>
              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={recordViewValues.isEditable}
                label="isEditable"
                name="isEditable"
                sx={{
                  width: "100%",
                }}
              />

              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={recordViewValues.showMenue}
                label="showMenue"
                name="showMenue"
                sx={{
                  width: "100%",
                }}
              />

              <CheckBox
                handleChange={handleChange}
                handleBlur={handleBlur}
                checked={recordViewValues.createNewDataset}
                label="createNewDataset"
                name="createNewDataset"
                sx={{
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={css.header_form_wrapper}>
        <ViewHeaderForm viewId={viewId} />
      </div>
    </>
  );
};

export default RecordViewForm;
