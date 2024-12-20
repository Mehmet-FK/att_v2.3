import Drawer from "@mui/material/Drawer";

import { DrawerHeader } from "@/layout/layout_helpers";

import ToolList from "./ToolList";

const ToolsDrawer = ({ open }) => {
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
        <ToolList tools={views} title="View Types" />
        <ToolList tools={launchTypes} title="Launch Types" />

        <DrawerHeader sx={{ paddingTop: 10 }} />
      </Drawer>
    </div>
  );
};
export default ToolsDrawer;
