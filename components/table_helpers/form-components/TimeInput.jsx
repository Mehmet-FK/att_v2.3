import TextField from "@mui/material/TextField";
import React, { useState } from "react";
const TimeInput = ({ name, label, value, filterVal, setFilterVal, width }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (Number(value[0]) === 2 && Number(value[1]) > 3) return;
    if (Number(value[0]) > 2) return;
    if (Number(value[2]) > 5) return;
    if (value.slice(-1) === ":") {
      setFilterVal({ ...filterVal, [name]: value.slice(0, 2) });
    }
    if (isNaN(value.slice(-1))) return;
    if (value.length > 2 && !value.includes(":")) {
      let edited = value.slice(0, 2) + ":" + value.slice(2);

      setFilterVal({ ...filterVal, [name]: edited });
    } else if (value.length < 6) {
      if (Number(value[3] > 5)) return;
      setFilterVal({ ...filterVal, [name]: value });
    }
  };

  return (
    <TextField
      onChange={handleChange}
      sx={{ width: width || "100%" }}
      variant="outlined"
      size="small"
      label={label}
      name={name}
      placeholder="--:--"
      value={value || ""}
      inputProps={{
        sx: {
          "&::-webkit-calendar-picker-indicator": {
            opacity: 0,
            border: "2px solid green",
            position: "absolute",
            right: 6,
            zIndex: 5,
          },
        },
      }}
    />
  );
};

export default TimeInput;
