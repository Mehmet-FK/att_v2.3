import { Handle, Position } from "reactflow";
import { useState } from "react";
import sty from "@/styles/rf-node-styles.module.css";
import { Tooltip } from "@mui/material";
import NodeDescriptionDialog from "../NodeDescriptionDialog";
import InfoIcon from "@mui/icons-material/Info";
const initialHandles = [
  {
    type: "source",
    position: Position.Right,
    id: Math.random().toString(36).substr(2, 9),
  },
  {
    type: "source",
    position: Position.Top,
    id: Math.random().toString(36).substr(2, 9),
  },
  {
    type: "source",
    position: Position.Left,
    id: Math.random().toString(36).substr(2, 9),
  },
  {
    type: "source",
    position: Position.Bottom,
    id: Math.random().toString(36).substr(2, 9),
  },
];

const handleStyles = {
  top: `${sty.handle} ${sty.handle_top}`,
  bottom: `${sty.handle} ${sty.handle_bottom}`,
  left: `${sty.handle} ${sty.handle_left}`,
  right: `${sty.handle} ${sty.handle_right}`,
};

const RecordNode = ({ data, isConnectable }) => {
  const [info, setInfo] = useState("");
  const [open, setOpen] = useState(false);
  const [handles, setHandles] = useState(initialHandles);

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

      <div
        className={`${sty.node_body} ${sty.record_node}`}
        onClick={handleOpenDialog}
      >
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

        <h5 className={sty.node_title}>{data.label}</h5>
        {handles.map((handle) => (
          <Handle
            type={handle.type}
            className={handleStyles[handle.position]}
            position={handle.position}
            id={handle.id}
            isConnectable={isConnectable}
            style={{
              width: "10px",
              height: " 10px",
              [handle.position]: "-10px",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default RecordNode;
