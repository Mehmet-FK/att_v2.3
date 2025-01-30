import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import MuiSelect from "@mui/material/Select";

const Select = ({
  label,
  name,
  children,
  value,
  onChange,
  width,
  disabled,
}) => {
  return (
    <FormControl disabled={disabled} fullWidth sx={{ width: width || "auto" }}>
      <InputLabel size="small" id="demo-simple-select-label">
        {label}
      </InputLabel>
      <MuiSelect
        size="small"
        labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={value || ""}
        name={name}
        label={label}
        onChange={onChange}
      >
        {children}
      </MuiSelect>
    </FormControl>
  );
};
export default Select;
