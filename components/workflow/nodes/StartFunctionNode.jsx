import { Handle, Position } from "reactflow";
import { useEffect, useState } from "react";
import sty from "@/styles/rf-node-styles.module.css";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
  ArrowRectangle,
  Circle,
  Clover,
  Cube,
  Cylinder,
  Diamond,
  FourLeaf,
  Parallelogram,
  Plus,
  Sun,
  ThornApple,
  Triangle,
} from "./node-comps/Shapes";

const colors = [
  { name: "blue", value: "#3F8AE2" },
  { name: "orange", value: "#CF4C2C" },
  { name: "yellow", value: "#EBC347" },
  { name: "green", value: "#438D57" },
  { name: "purple", value: "#803DEC" },
];

const StartFunctionNode = ({ data, isConnectable }) => {
  const [color, setColor] = useState(colors[data.attID * 1]);

  const handleColor = () => {
    let i = colors.findIndex((c) => c.name === color.name);

    if (i < colors.length - 1) i++;
    else i = 0;

    setColor(colors[i]);
  };
  return (
    <>
      <div
        onClick={() => handleColor()}
        className={`${sty.launchnode_wrapper} ${sty[color.name]} `}
      >
        <h5 className={sty.shape_node_title}>{data.label}</h5>
        {data.attID === "0" && <FourLeaf color={color.value} />}
        {data.attID === "1" && <ThornApple color={color.value} />}
        {data.attID === "2" && <Clover color={color.value} />}
        {data.attID === "3" && <Sun color={color.value} />}
        {/* <Triangle color={color.value} /> */}
        {/* <ArrowRectangle color={color.value} /> */}
        {/* <Cylinder color={color.value} /> */}
        {/* <Diamond color={color.value} /> */}
        {/* <Parallelogram color={color.value} /> */}
        {/* <Plus color={color.value} /> */}

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
