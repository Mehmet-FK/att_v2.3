import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import css from "@/styles/workflow-forms/record-view-form.module.css";

const CustomSelect = ({
  handleChange,
  handleBlur,
  name,
  value,
  label,
  size,
  options,
  preferences,
  FormControlProps,
  SelectProps,
}) => {
  const optKey = preferences.key;
  const optCaption = preferences.caption;

  return (
    <FormControl
      className={css.form_control}
      size={size || "medium"}
      {...FormControlProps}
    >
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        {...SelectProps}
        MenuProps={{
          style: { zIndex: 35001 },
        }}
        labelId={name}
        id={name + "-select-small"}
        value={value}
        label={label}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <MenuItem value={""}>
          <em>None</em>
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={option[optKey]} value={option[optKey]}>
            {option[optCaption]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
