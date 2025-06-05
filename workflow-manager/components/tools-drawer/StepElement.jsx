import { Box, Typography } from "@mui/material";
import css from "@/styles/drawer-styles/tools-drawer.module.css";
import {
  AttachmentShape,
  ImageShape,
  InfoScreenShape,
  LaunchDatasetShape,
  LaunchDefaultListViewShape,
  LaunchDefaultShape,
  LaunchEntityShape,
  LaunchGroupShape,
  LaunchModuleShape,
  LaunchWorkflowHubShape,
  ListShape,
  ModalShape,
  NFCScannerShape,
  QRScannerShape,
  RecordShape,
  TileShape,
  WorkflowRelayShape,
} from "@/workflow-manager/components/nodes/utils/Shapes";
const StepElement = ({ tool }) => {
  const onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("application/reactflow", tool.name);
    e.dataTransfer.setData("caption", tool.caption);
    e.dataTransfer.setData("type", tool.type);
    e.dataTransfer.setData("typeId", tool?.typeId);

    e.dataTransfer.effectAllowed = "move";
  };
  const stepElementStyle = {
    transform: "scale(0.8)",
  };
  return (
    <Box
      sx={{
        bgcolor: "Background",
      }}
      className={css.tool_element}
      title={tool.caption}
      onDragStart={onDragStart}
      draggable
    >
      <Typography
        className={css.tooltext}
        sx={{
          textTransform: "capitalize",
          fontSize: "0.7em",
        }}
      >
        {tool.caption}
      </Typography>

      {tool.name === "ListView" && <ListShape style={stepElementStyle} />}
      {tool.name === "TileView" && <TileShape style={stepElementStyle} />}
      {tool.name === "RecordView" && <RecordShape style={stepElementStyle} />}
      {tool.name === "ModalDialog" && <ModalShape style={stepElementStyle} />}
      {tool.name === "CaptureImage" && <ImageShape style={stepElementStyle} />}
      {tool.name === "AttachmentView" && (
        <AttachmentShape style={stepElementStyle} />
      )}
      {tool.name === "ScannerDialogNFC" && (
        <NFCScannerShape style={stepElementStyle} />
      )}
      {tool.name === "ScannerDialogQR" && (
        <QRScannerShape style={stepElementStyle} />
      )}
      {tool.name === "WorkflowRelay" && (
        <WorkflowRelayShape style={stepElementStyle} />
      )}
      {tool.name === "InfoScreen" && (
        <InfoScreenShape style={stepElementStyle} />
      )}

      {tool.name === "LaunchDatasetFunction" && (
        <LaunchDatasetShape style={stepElementStyle} />
      )}
      {tool.name === "LaunchEntityFunction" && (
        <LaunchEntityShape style={stepElementStyle} />
      )}
      {tool.name === "LaunchModule" && (
        <LaunchModuleShape style={stepElementStyle} />
      )}
      {tool.name === "LaunchElementDefaultFunction" && (
        <LaunchDefaultShape style={stepElementStyle} />
      )}
      {tool.name === "LaunchGroupView" && (
        <LaunchGroupShape style={stepElementStyle} />
      )}
      {tool.name === "LaunchDefaultListView" && (
        <LaunchDefaultListViewShape style={stepElementStyle} />
      )}
      {tool.name === "LaunchHub" && (
        <LaunchWorkflowHubShape style={stepElementStyle} />
      )}
    </Box>
  );
};

export default StepElement;
