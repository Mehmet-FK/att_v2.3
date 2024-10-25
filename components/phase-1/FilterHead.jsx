import { memo } from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
// import css from "@/styles/filter-panel.module.css";

const FilterHead = ({ open, setOpen, pageTitle }) => {
  return (
    <Box className={"fp_icon_wrapper"} onClick={() => setOpen(!open)}>
      <h2 className={"fp_filter_title"}>
        <em>{pageTitle}</em>
      </h2>
      <div className={"fp_f_head_content"}>
        <Typography
          fontSize={12}
          sx={{ display: open && "none", width: open ? "0px" : "auto" }}
        >
          Suche öffnen
        </Typography>
        <IconButton>
          <Typography className={"fp_icon"}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Typography>
        </IconButton>
      </div>
    </Box>
  );
};

export default memo(FilterHead);
