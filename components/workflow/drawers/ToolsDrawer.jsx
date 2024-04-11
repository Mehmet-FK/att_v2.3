import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DrawerHeader } from "@/layout/layout_helpers";

const SubList = ({ tools, title }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const onDragStart = (e, node) => {
    e.dataTransfer.setData("application/reactflow", node.name);
    e.dataTransfer.setData("caption", node.caption);
    e.dataTransfer.setData("type", node.type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <ListItemButton sx={{ backgroundColor: "#dfdfdf" }} onClick={handleClick}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {tools.map((tool) => (
            <ListItem
              sx={{ paddingLeft: 2 }}
              dense
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
      </Collapse>
    </Box>
  );
};

const ToolsDrawer = ({ open, setOpen }) => {
  const views = [
    { name: "ListView", caption: "List View", type: "view" },
    { name: "TileView", caption: "Tile View", type: "view" },
    { name: "RecordView", caption: "Record View", type: "view" },
    { name: "ModalDialog", caption: "Modal Dialog", type: "view" },
    { name: "CaptureImage", caption: "Capture Image View", type: "view" },
    { name: "AttachmentView", caption: "Attachment View", type: "view" },
  ];

  const launchTypes = [
    {
      name: "LaunchDatasetFunction",
      caption: "Launch Dataset Function",
      type: "launch",
    },
    {
      name: "LaunchEntityFunction",
      caption: "Launch Entity Function",
      type: "launch",
    },
    { name: "LaunchModule", caption: "Launch Module", type: "launch" },
    {
      name: "LaunchElementDefaultFunction",
      caption: "Launch Element Default",
      type: "launch",
    },
  ];

  return (
    <div>
      <Drawer anchor="right" variant="persistent" open={open}>
        <DrawerHeader sx={{ paddingTop: 10 }} />
        <SubList tools={views} title="View Types" />
        <SubList tools={launchTypes} title="Launch Types" />

        <DrawerHeader sx={{ paddingTop: 10 }} />
      </Drawer>
    </div>
  );
};
export default ToolsDrawer;
