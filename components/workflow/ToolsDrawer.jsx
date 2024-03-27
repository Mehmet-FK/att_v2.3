import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const ToolsDrawer = ({ open, setOpen }) => {
  const tools = [
    { name: "list", caption: "List View" },
    { name: "tile", caption: "Tile View" },
    { name: "record", caption: "Record View" },
    { name: "modaldialog", caption: "Modal Dialog" },
    { name: "captureimage", caption: "Capture Image View" },
    { name: "attachment", caption: "Attachment View" },
  ];

  const onDragStart = (e, node) => {
    e.dataTransfer.setData("application/reactflow", node.name);
    e.dataTransfer.setData("caption", node.caption);
    e.dataTransfer.effectAllowed = "move";
  };

  const DrawerList = (
    <Box sx={{ width: 250, paddingTop: "65px" }} role="presentation">
      <List>
        {tools.map((tool) => (
          <ListItem
            key={tool.name}
            disablePadding
            onDragStart={(e) => onDragStart(e, tool)}
            draggable
          >
            <ListItemButton>
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={tool.caption}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" variant="persistent" open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
export default ToolsDrawer;
