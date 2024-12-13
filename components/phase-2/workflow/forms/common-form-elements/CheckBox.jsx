import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CheckBox = ({
  name,
  checked,
  handleChange,
  handleBlur,
  label,
  labelPlacement,
  sx,
  style,
}) => {
  return (
    <FormControlLabel
      sx={sx || {}}
      style={style || {}}
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      }
      label={<span style={{ fontSize: "smaller" }}>{label}</span>}
      labelPlacement={labelPlacement || "end"}
    />
  );
};

export default CheckBox;
