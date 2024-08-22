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
import {
  ArrowRectangle,
  Circle,
  Clover,
  Cube,
  Cylinder,
  Diamond,
  FourLeaf,
  Parallelogram,
  Sun,
  ThornApple,
  Triangle,
} from "../nodes/node-comps/Shapes";

const StepElement = ({ onDragStart, tool }) => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          transform: "scale(0.6)",
          cursor: "pointer",
        }}
        title={tool.caption}
        onDragStart={(e) => onDragStart(e, tool)}
        draggable
      >
        {tool.name === "ListView" && <Parallelogram color={"#6d7def"} />}
        {tool.name === "TileView" && <Cube color={"#CF4C2C"} />}
        {tool.name === "RecordView" && <Sun color={"#3F8AE2"} />}
        {tool.name === "ModalDialog" && <Circle color={"#EBC347"} />}
        {tool.name === "CaptureImage" && <Cylinder color={"#803DEC"} />}
        {tool.name === "AttachmentView" && <FourLeaf color={"#438D57"} />}
        {/* //Launch Elements */}
        {tool.name === "LaunchDatasetFunction" && (
          <ThornApple color={"#3F8AE2"} />
        )}
        {tool.name === "LaunchEntityFunction" && <Clover color={"#EBC347"} />}
        {tool.name === "LaunchModule" && <ArrowRectangle color={"#803DEC"} />}
        {tool.name === "LaunchElementDefaultFunction" && (
          <Triangle color={"#438D57"} />
        )}
        <p
          style={{
            textTransform: "capitalize",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "0.7em",
          }}
        >
          {tool.caption}
        </p>{" "}
      </Box>
    </>
  );
};

const SubList = ({ tools, title }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const onDragStart = (e, node) => {
    e.stopPropagation();
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              // gap: "5px",
              flexDirection: "row",
            }}
          >
            {tools.map((tool) => (
              /*  <ListItem
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
            </ListItem> */

              <StepElement tool={tool} onDragStart={onDragStart} />
            ))}
          </Box>
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
