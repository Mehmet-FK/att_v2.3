import { Handle, Position } from "reactflow";
import { useState } from "react";
import sty from "@/styles/rf-node-styles.module.css";
import { Tooltip } from "@mui/material";
import NodeDescriptionDialog from "../NodeDescriptionDialog";
import InfoIcon from "@mui/icons-material/Info";
import { Sun } from "./node-comps/Shapes";
const initialHandles = [
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
        // tabIndex={-1}
        className={`${sty.node_body} ${sty.record_node}`}
        onClick={handleOpenDialog}
        // onKeyDown={(e) => console.log(e.key)}
      >
        <Sun color={"#3F8AE2"} />
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
