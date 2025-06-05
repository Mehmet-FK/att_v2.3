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
  size,
}) => {
  return (
    <FormControlLabel
      sx={sx || {}}
      style={style || {}}
      control={
        <Checkbox
          size={size || "medium"}
          name={name}
          checked={checked || false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      }
      label={<p style={{ fontSize: "smaller" }}>{label}</p>}
      labelPlacement={labelPlacement || "end"}
    />
  );
};

export default CheckBox;
