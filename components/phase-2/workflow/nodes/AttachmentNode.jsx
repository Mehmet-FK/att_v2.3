import { Handle, Position } from "reactflow";
import { useState } from "react";
import css from "@/styles/rf-node-styles.module.css";
import { Box, Tooltip } from "@mui/material";
import NodeDescriptionDialog from "../NodeDescriptionDialog";
import InfoIcon from "@mui/icons-material/Info";
import { AttachmentShape, FourLeaf } from "./node-comps/Shapes";
const handles = [
  {
    type: "source",
    position: Position.Right,
    id: "a",
  },
  {
    type: "source",
    position: Position.Top,
    id: "b",
  },
  {
    type: "source",
    position: Position.Left,
    id: "c",
  },
  {
    type: "source",
    position: Position.Bottom,
    id: "d",
  },
];

const handleStyles = {
  top: `${css.handle} ${css.handle_top}`,
  bottom: `${css.handle} ${css.handle_bottom}`,
  left: `${css.handle} ${css.handle_left}`,
  right: `${css.handle} ${css.handle_right}`,
};

const AttachmentNode = ({ data, isConnectable }) => {
  const [info, setInfo] = useState(``);
  const [open, setOpen] = useState(false);
  // const [handles, setHandles] = useState(initialHandles);

  const handleOpenDialog = (e) => {
    if (e.detail > 1) setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <NodeDescriptionDialog
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Box
        className={`${css.node_body} `}
        sx={{ bgcolor: "Background" }}
        onClick={handleOpenDialog}
      >
        <AttachmentShape color={"#438D57"} />
        <Tooltip title={info} placement="top">
          {info.length > 0 && (
            <InfoIcon
              fontSize="small"
              sx={{
                position: "absolute",
                top: "2px",
                right: "2px",
                opacity: "0.6",
                "&:hover": { opacity: "1" },
              }}
            />
          )}
        </Tooltip>

        <h5 className={css.node_title}>{data.label}</h5>
        {handles.map((handle) => (
          <Handle
            type={handle.type}
            className={handleStyles[handle.position]}
            position={handle.position}
            id={handle.id}
            isConnectable={isConnectable}
            style={{
              width: "20px",
              height: "20px",
              [handle.position]: "-15px",
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default AttachmentNode;
