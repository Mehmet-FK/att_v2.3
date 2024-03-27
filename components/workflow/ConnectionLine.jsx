import { useStore } from "reactflow";

export default ({ fromX, fromY, toX, toY }) => {
  const { connectionHandleId } = useStore();

  return (
    <g>
      <path
        fill="none"
        stroke={"blue"}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#000"
        r={3}
        stroke={"red"}
        strokeWidth={1.5}
      />
    </g>
  );
};
