import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import css from "@/styles/workflow-forms/header-form.module.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const ViewHeaderColumn = ({ columnValues }) => {
  const columnTypes = {
    Text: "0",
    Value: "1",
    Icon: "2",
    Variable: "3",
  };

  const [columnFormValues, setColumnFormValues] = useState(columnValues);

  const { updateViewHeaderColumnValue } = useWorkflowForms();

  const removeCol = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColumnFormValues({ ...columnFormValues, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    updateViewHeaderColumnValue(name, value, columnValues.headerColumnId);
  };

  const columnKeys = Object.keys(columnTypes);
  return (
    <div
      style={{
        border: "1px solid #aaa5",
        padding: "5px",
        position: "relative",
      }}
      className={css.flex_column}
    >
      <div className={css.flex_row}>
        <FormControl size="small" fullWidth>
          <InputLabel size="small" id="demo-simple-select-label">
            Column Type
          </InputLabel>
          <Select
            onChange={handleChange}
            onBlur={handleBlur}
            value={columnFormValues?.columnType || ""}
            MenuProps={{
              style: { zIndex: 35001 },
            }}
            name="columnType"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label=" Column Type"
            size="small"
          >
            <MenuItem value={""}>None</MenuItem>
            {columnKeys.map((colType) => (
              <MenuItem key={colType} value={columnTypes[colType]}>
                {colType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.columnValue || ""}
          variant="outlined"
          size="small"
          label="Column Value"
          name="columnValue"
          fullWidth
        />
      </div>
      <div className={css.flex_row}>
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.colSpan || ""}
          variant="outlined"
          size="small"
          label="Column Span"
          name="colSpan"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.rowSpan || ""}
          variant="outlined"
          size="small"
          label="Row Span"
          name="rowSpan"
          fullWidth
        />
      </div>
      <div className={css.flex_row}>
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.fontFamily || ""}
          variant="outlined"
          size="small"
          label="Font Family"
          name="fontFamily"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          onBlur={handleBlur}
          value={columnFormValues?.fontColor || ""}
          variant="outlined"
          size="small"
          label="Font Color"
          name="fontColor"
          fullWidth
        />
      </div>
      <div>
        <span
          title="remove column"
          className={css.remove_column_btn}
          onClick={removeCol}
        >
          ×
        </span>
      </div>
    </div>
  );
};

export default ViewHeaderColumn;
