import { Box, Typography } from "@mui/material";
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
} from "../../nodes/node-comps/Shapes";

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
      {tool.name === "AttachmentView" && <AttachmentShape color={"#438D57"} />}
      {tool.name === "ScannerDialogNFC" && <ListShape color={"#00f"} />}
      {tool.name === "ScannerDialogQR" && <ListShape color={"#f00"} />}

      {tool.name === "LaunchDatasetFunction" && <LaunchDatasetShape />}
      {tool.name === "LaunchEntityFunction" && <LaunchEntityShape />}
      {tool.name === "LaunchModule" && <LaunchModuleShape />}
      {tool.name === "LaunchElementDefaultFunction" && <LaunchDefaultShape />}
      {tool.name === "LaunchGroupView" && <LaunchGroupShape />}
    </Box>
  );
};

export default StepElement;
