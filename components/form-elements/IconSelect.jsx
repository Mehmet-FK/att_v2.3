import { WidthFull } from "@mui/icons-material";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
const IconSelect = ({ handleChange, handleBlur, size, value, name }) => {
  const icons = [
    "https://apl.attensam.at/icons/GF_Erfassung_Icon_small.png",
    "https://apl.attensam.at/icons/Large_ic_categoty@MDPI.png",
    "https://apl.attensam.at/icons/Leistungsscheine_Modul_Icon.png",
  ];

  return (
    <>
      <FormControl size={size ? size : "medium"} fullWidth>
        <InputLabel size={size ? size : "medium"} id="demo-simple-select-label">
          Icon
        </InputLabel>
        <Select
          MenuProps={{
            style: { zIndex: 35001 },
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          sx={{ display: "flex", alignItems: "center" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Icon"
          size={size ? size : "medium"}
          name={name || "icon"}
          value={value}
        >
          <MenuItem value={""}>None</MenuItem>

          {icons.map((icon) => (
            <MenuItem
              sx={{ display: "flex", alignItems: "center" }}
              key={icon}
              value={icon}
            >
              <Image
                src={icon}
                width={25}
                height={25}
                style={{ borderRadius: "5px", padding: 0 }}
              />
              <span
                style={{
                  fontSize: "smaller",
                  marginLeft: "5px",
                  display: "inline-block",
                }}
              >
                {icon}
              </span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default IconSelect;
