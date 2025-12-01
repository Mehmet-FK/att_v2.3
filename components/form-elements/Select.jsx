import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import MuiSelect from "@mui/material/Select";
import { useId } from "react";

const Select = ({
  label,
  name,
  children,
  value,
  onChange,
  onBlur,
  width,
  disabled,
  sxContainer,
  sxSelect,
}) => {
  const handleChange = onChange ? onChange : () => null;
  const handleBlur = onBlur ? onBlur : () => null;
  return (
    <FormControl
      disabled={disabled}
      sx={{ width: width ? width : "auto", ...sxContainer }}
    >
      <InputLabel size="small" id={label + "ID"}>
        {label}
      </InputLabel>
      <MuiSelect
        size="small"
        labelId={label + "ID"}
        value={value || ""}
        name={name}
        label={label}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={sxSelect}
      >
        {children}
      </MuiSelect>
    </FormControl>
  );
};
export default Select;
