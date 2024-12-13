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
  AttachmentShape,
  ImageShape,
  LaunchDatasetShape,
  LaunchDefaultShape,
  LaunchEntityShape,
  LaunchGroupShape,
  LaunchModuleShape,
  ListShape,
  ModalShape,
  RecordShape,
  TileShape,
} from "../nodes/node-comps/Shapes";
import { Typography } from "@mui/material";

const StepElement = ({ tool }) => {
  const onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("application/reactflow", tool.name);
    e.dataTransfer.setData("caption", tool.caption);
    e.dataTransfer.setData("type", tool.type);
    e.dataTransfer.setData("typeId", tool?.typeId);

    e.dataTransfer.effectAllowed = "move";
  };

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
        onDragStart={onDragStart}
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

        {tool.name === "ListView" && <ListShape />}
        {tool.name === "TileView" && <TileShape />}
        {tool.name === "RecordView" && <RecordShape />}
        {tool.name === "ModalDialog" && <ModalShape />}
        {tool.name === "CaptureImage" && <ImageShape />}
        {tool.name === "AttachmentView" && (
          <AttachmentShape color={"#438D57"} />
        )}
        {tool.name === "ScannerDialogNFC" && <ListShape color={"#00f"} />}
        {tool.name === "ScannerDialogQR" && <ListShape color={"#f00"} />}

        {tool.name === "LaunchDatasetFunction" && <LaunchDatasetShape />}
        {tool.name === "LaunchEntityFunction" && <LaunchEntityShape />}
        {tool.name === "LaunchModule" && <LaunchModuleShape />}
        {tool.name === "LaunchElementDefaultFunction" && <LaunchDefaultShape />}
        {tool.name === "LaunchGroupView" && <LaunchGroupShape />}
      </Box>
    </>
  );
};

const SubList = ({ tools, title }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
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
              <StepElement
                key={tool.name}
                tool={tool}
                // onDragStart={onDragStart}
              />
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
    { name: "ScannerDialogNFC", caption: "NFC Scanner Dialog", type: "view" },
    { name: "ScannerDialogQR", caption: "QR Scanner Dialog", type: "view" },
  ];

  const launchTypes = [
    {
      name: "LaunchDatasetFunction",
      caption: "Dataset Function",
      type: "launch",
      typeId: 0,
    },
    {
      name: "LaunchEntityFunction",
      caption: "Entity Function",
      type: "launch",
      typeId: 1,
    },
    { name: "LaunchModule", caption: "Module", type: "launch", typeId: 2 },
    {
      name: "LaunchElementDefaultFunction",
      caption: "Element Default",
      type: "launch",
      typeId: 3,
    },
    {
      name: "LaunchGroupView",
      caption: "Group View",
      type: "launch",
      typeId: 4,
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
