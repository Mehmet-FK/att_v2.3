import { Handle, Position } from "reactflow";
import { useEffect, useState } from "react";
import sty from "@/styles/rf-node-styles.module.css";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
  ArrowRectangle,
  Circle,
  Cylinder,
  Triangle,
} from "./node-comps/Shapes";

const colors = [
  { name: "blue", value: "#3F8AE2A0" },
  { name: "orange", value: "#CF4C2CA0" },
  { name: "yellow", value: "#EBC347a0" },
  { name: "green", value: "#438D57a0" },
];

const StartFunctionNode = ({ data, isConnectable }) => {
  const [color, setColor] = useState({ name: "orange", value: "#CF4C2Cbb" });

  const handleColor = () => {
    let i = colors.findIndex((c) => c.name === color.name);
    console.log(i);

    if (i < colors.length - 1) i++;
    else i = 0;

    setColor(colors[i]);
  };

  useEffect(() => {
    console.log(color);
  }, [color]);

  return (
    <>
      <div
        onClick={() => handleColor()}
        className={`${sty.launchnode_wrapper} ${sty[color.name]} `}
      >
        <h5 className={sty.shape_node_title}>{data.label}</h5>
        {/* <Circle color={color.value} /> */}
        {/* <Triangle color={color.value} /> */}
        {/* <ArrowRectangle color={color.value} /> */}
        <Cylinder color={color.value} />

        <Handle
          type="source"
          position={Position.Right}
          id={"start"}
          isConnectable={isConnectable}
          style={{
            width: "10px",
            height: " 10px",
          }}
        />
      </div>
    </>
  );
};

export default StartFunctionNode;
