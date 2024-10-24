import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DrawerHeader } from "@/layout/layout_helpers";
import css from "@/styles/tools-drawer.module.css";
import {
  ArrowRectangle,
  AttachmentShape,
  Circle,
  Clover,
  Cube,
  Cylinder,
  Diamond,
  FourLeaf,
  ImageShape,
  LaunchDatasetShape,
  LaunchDefaultShape,
  LaunchEntityShape,
  LaunchGroupShape,
  LaunchModuleShape,
  ListShape,
  ModalShape,
  Parallelogram,
  RecordShape,
  Sun,
  ThornApple,
  TileShape,
} from "../nodes/node-comps/Shapes";
import { Typography } from "@mui/material";

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
          bgcolor: "Background",
          padding: "5px",
          width: "7rem",
          height: "7rem",
          borderRadius: "10px",
        }}
        className={css.tool_element}
        title={tool.caption}
        onDragStart={(e) => onDragStart(e, tool)}
        draggable
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            color: "WindowText",
            textAlign: "center",
            fontSize: "0.7em",
          }}
        >
          {tool.caption}
        </Typography>

        {tool.name === "ListView" && <ListShape color={"#6d7def"} />}
        {tool.name === "TileView" && <TileShape color={"#CF4C2C"} />}
        {tool.name === "RecordView" && <RecordShape color={"#3F8AE2"} />}
        {tool.name === "ModalDialog" && <ModalShape color={"#EBC347"} />}
        {tool.name === "CaptureImage" && <ImageShape color={"#803DEC"} />}
        {tool.name === "AttachmentView" && (
          <AttachmentShape color={"#438D57"} />
        )}
        {/* //Launch Elements */}
        {tool.name === "LaunchDatasetFunction" && <LaunchDatasetShape />}
        {tool.name === "LaunchEntityFunction" && <LaunchEntityShape />}
        {tool.name === "LaunchModule" && <LaunchModuleShape />}
        {tool.name === "LaunchElementDefaultFunction" && <LaunchDefaultShape />}
        {tool.name === "LaunchGroupView" && <LaunchGroupShape />}

        {/* 
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
        </p> */}
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
      <ListItemButton
        sx={{ bgcolor: "paper.background", color: "paper.text" }}
        onClick={handleClick}
      >
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {tools.map((tool) => (
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
      caption: "Dataset Function",
      type: "launch",
    },
    {
      name: "LaunchEntityFunction",
      caption: "Entity Function",
      type: "launch",
    },
    { name: "LaunchModule", caption: "Module", type: "launch" },
    {
      name: "LaunchElementDefaultFunction",
      caption: "Element Default",
      type: "launch",
    },
    {
      name: "LaunchGroupView",
      caption: "Group View",
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
