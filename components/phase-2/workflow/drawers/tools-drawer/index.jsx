// import Drawer from "@mui/material/Drawer";

import { DrawerHeader } from "@/layout/layout_helpers";

import ToolList from "./ToolList";
import { Box, IconButton, Tooltip } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import css from "@/styles/tools-drawer.module.css";
import { useEffect, useState } from "react";
// SEPERATOR
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useTheme } from "@emotion/react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  width: `10px`,
  [theme.breakpoints.up("sm")]: {
    width: `10px`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const ToolsDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
    <>
      <Drawer
        variant="permanent"
        anchor="right"
        open={open}
        PaperProps={{ sx: { overflowY: "visible" } }}
        sx={{ position: "relative" }}
      >
        <div
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
          className={css.open_button}
          onClick={() => setOpen(!open)}
        >
          <Tooltip title={open ? "Schließen" : "Öffnen"} enterDelay={200}>
            <KeyboardArrowLeftIcon
              sx={{
                fontSize: "2rem",
                transform: `rotate( ${open ? "180deg" : "0deg"})`,
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Tooltip>
        </div>
        <DrawerHeader sx={{ paddingTop: 10 }} />
        <ToolList tools={views} title="View Types" />
        <ToolList tools={launchTypes} title="Launch Types" />
        {/* <DrawerHeader sx={{ paddingTop: 10 }} /> */}
      </Drawer>
    </>
  );
};
export default ToolsDrawer;
