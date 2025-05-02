import css from "@/styles/entity-styles/entities.module.css";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import { Box, Menu, Paper } from "@mui/material";
import { useRef, useState } from "react";
import useOnClickOutside from "@/hooks/table-hooks/useOnClickOutside";

const CopyPasteContextMenu = ({ contextMenu, handleClose, handlePaste }) => {
  const contextMenuRef = useRef(null);

  useOnClickOutside(contextMenuRef, handleClose);

  const handlePasteOnClick = (e) => {
    handlePaste(e);
    handleClose();
  };

  return (
    <Box
      className={css.context_menu}
      sx={{
        top: `${contextMenu.y}px`,
        left: `${contextMenu.x}px`,
      }}
      component={Paper}
      ref={contextMenuRef}
    >
      <MenuItem sx={{ width: "100%" }} onClick={handlePasteOnClick}>
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <Typography sx={{ fontSize: "small", width: "100%" }}>Paste</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Strg + V
        </Typography>
      </MenuItem>
    </Box>
  );
};

export default CopyPasteContextMenu;
