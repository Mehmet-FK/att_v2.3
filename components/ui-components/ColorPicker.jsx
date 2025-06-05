import { colors, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const Container = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  width: "100%",
  position: "relative",
}));

const ColorInput = styled("input")(({ size }) => ({
  marginRight: "18px",
  WebkitAppearance: "none",
  border: "none",
  width: "auto",
  height: "auto",
  cursor: "pointer",
  background: "none",
  position: "absolute",
  left: "10px",
  top: size === "small" ? "9px" : "15px",
  zIndex: "10",

  "&::-webkit-color-swatch-wrapper": {
    padding: 0,

    width: size === "small" ? "17px" : "20px",
    height: size === "small" ? "17px" : "20px",
  },

  "&::-webkit-color-swatch": {
    borderRadius: "50%",
    padding: 0,
  },
}));

const ColorPicker = ({
  handleBlur,
  handleChange,
  value,
  name,
  label,
  fullWidth,
  size,
}) => {
  const isValidColor = () => {
    const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
    return hexRegex.test(value);
  };

  return (
    <Container>
      <ColorInput
        type="color"
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        name={name}
        size={size}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        name={name}
        label={label}
        fullWidth={fullWidth}
        variant="outlined"
        error={!isValidColor()}
        helperText={
          !isValidColor() ? `${value} ist kein gültiger Farbcode` : null
        }
        size={size}
        slotProps={{
          input: {
            style: {
              paddingLeft: "25px",
              textTransform: "revert",
            },
          },
        }}
      />
    </Container>
  );
};

export default ColorPicker;
