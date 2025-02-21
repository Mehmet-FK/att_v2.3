import { Handle, Position } from "reactflow";
import css from "@/styles/workflow-tool-styles/workflow-tool-node-styles.module.css";

const NodeHandles = ({ isConnectable, isConditionNode, isLaunchNode }) => {
  const regularHandles = [
    {
      type: "source",
      position: Position.Right,
      positionType: Position.Right,
      id: "a",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Top,
      positionType: Position.Top,
      id: "b",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Left,
      positionType: Position.Left,
      id: "c",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Bottom,
      positionType: Position.Bottom,
      id: "d",
      handleIcon: "",
    },
  ];

  const launchHandles = [
    {
      type: "source",
      position: Position.Right,
      positionType: Position.Right,
      id: "a_start",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Top,
      positionType: Position.Top,
      id: "b_start",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Left,
      positionType: Position.Left,
      id: "c_start",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Bottom,
      positionType: Position.Bottom,
      id: "d_start",
      handleIcon: "",
    },
  ];

  const conditionHandles = [
    {
      type: "source",
      position: Position.Right,
      positionType: "right_top",
      id: "a_top",
      handleIcon: "✔",
    },
    {
      type: "source",
      position: Position.Right,
      positionType: "right_bottom",
      id: "a_bottom",
      handleIcon: "✖",
    },
    {
      type: "source",
      position: Position.Top,
      positionType: Position.Top,
      id: "b",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Left,
      positionType: Position.Left,
      id: "c",
      handleIcon: "",
    },
    {
      type: "source",
      position: Position.Bottom,
      positionType: Position.Bottom,
      id: "d",
      handleIcon: "",
    },
  ];

  const handles = isConditionNode
    ? conditionHandles
    : isLaunchNode
    ? launchHandles
    : regularHandles;

  const handleStyles = {
    top: `${css.handle} ${css.handle_top}`,
    bottom: `${css.handle} ${css.handle_bottom}`,
    left: `${css.handle} ${css.handle_left}`,
    right: `${css.handle} ${css.handle_right}`,
    right_top: `${css.handle} ${css.handle_right_top}`,
    right_bottom: `${css.handle} ${css.handle_right_bottom}`,
  };

  return (
    <>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          className={handleStyles[handle.positionType]}
          position={handle.position}
          onClick={() => console.log({ handle })}
          id={handle.id}
          isConnectable={isConnectable}
          style={{
            width: "20px",
            height: "20px",
            [handle.position]: "-15px",
          }}
        >
          {handle.handleIcon}
        </Handle>
      ))}
    </>
  );
};

export default NodeHandles;
