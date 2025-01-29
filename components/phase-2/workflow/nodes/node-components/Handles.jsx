import { Handle, Position } from "reactflow";
import css from "@/styles/workflow-tool-styles/workflow-tool-node-styles.module.css";

const NodeHandles = ({ isConnectable }) => {
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

  return (
    <>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
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
    </>
  );
};

export default NodeHandles;
