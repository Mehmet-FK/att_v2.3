import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import MuiSelect from "@mui/material/Select";
import { useId } from "react";

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
    <FormControl disabled={disabled} sx={{ width: width ? width : "auto" }}>
      <InputLabel size="small" id={label + "ID"}>
        {label}
      </InputLabel>
      <MuiSelect
        size="small"
        labelId={label + "ID"}
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
