import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";

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
  defaultValue,
  disabled,
  showNone,
}) => {
  const optKey = preferences?.key;
  const optValue = preferences?.value;
  const optCaption = preferences?.caption;
  const defaultEmptyValue = defaultValue !== undefined ? defaultValue : "";
  const validateValue = (value) => {
    if (typeof value === "number" || value) {
      return value;
    } else {
      return defaultEmptyValue;
    }
  };
  const getKey = (option) => {
    if (optKey) {
      return option[optKey];
    } else {
      return option;
    }
  };

  const getValue = (option) => {
    if (optValue) {
      return option[optValue];
    } else if (optKey) {
      return option[optKey];
    } else {
      return option;
    }
  };

  const getCaption = (option) => {
    if (optCaption) {
      return option[optCaption];
    } else {
      return option;
    }
  };

  return (
    <FormControl
      className={css.form_control}
      size={size || "medium"}
      {...FormControlProps}
      title={value}
      disabled={disabled}
    >
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        {...SelectProps}
        MenuProps={{
          style: { zIndex: 35001 },
        }}
        labelId={name}
        id={name + "-select-small"}
        value={validateValue(value)}
        label={label}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
      >
        <MenuItem value={defaultEmptyValue}>
          <em>None</em>
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={getKey(option)} value={getValue(option)}>
            {getCaption(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
