import { Box, Typography } from "@mui/material";
import css from "@/styles/drawer-styles/tools-drawer.module.css";
import {
  AttachmentShape,
  ImageShape,
  LaunchDatasetShape,
  LaunchDefaultListViewShape,
  LaunchDefaultShape,
  LaunchEntityShape,
  LaunchGroupShape,
  LaunchModuleShape,
  LaunchWorkflowHubShape,
  ListShape,
  LoopElementShape,
  ModalShape,
  NFCScannerShape,
  QRScannerShape,
  RecordShape,
  TileShape,
  WorkflowRelayShape,
} from "../../nodes/node-components/Shapes";

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
      {tool.name === "AttachmentView" && <AttachmentShape />}
      {tool.name === "ScannerDialogNFC" && <NFCScannerShape />}
      {tool.name === "ScannerDialogQR" && <QRScannerShape />}
      {tool.name === "WorkflowRelay" && <WorkflowRelayShape />}

      {tool.name === "LaunchDatasetFunction" && <LaunchDatasetShape />}
      {tool.name === "LaunchEntityFunction" && <LaunchEntityShape />}
      {tool.name === "LaunchModule" && <LaunchModuleShape />}
      {tool.name === "LaunchElementDefaultFunction" && <LaunchDefaultShape />}
      {tool.name === "LaunchGroupView" && <LaunchGroupShape />}
      {tool.name === "LaunchDefaultListView" && <LaunchDefaultListViewShape />}
      {tool.name === "LaunchHub" && <LaunchWorkflowHubShape />}
    </Box>
  );
};

export default StepElement;
