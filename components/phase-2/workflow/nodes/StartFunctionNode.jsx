import { Handle, Position } from "reactflow";
import { useEffect, useState } from "react";
import css from "@/styles/rf-node-styles.module.css";
import { Box, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
  ArrowRectangle,
  Circle,
  Clover,
  Cube,
  Cylinder,
  Diamond,
  FourLeaf,
  LaunchDatasetShape,
  LaunchDefaultShape,
  LaunchEntityShape,
  LaunchGroupShape,
  LaunchModuleShape,
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
  return (
    <>
      <Box className={css.launchnode_wrapper} sx={{ bgcolor: "Background" }}>
        {data.attID === "0" && <LaunchDatasetShape />}
        {data.attID === "1" && <LaunchEntityShape />}
        {data.attID === "2" && <LaunchModuleShape />}
        {data.attID === "3" && <LaunchDefaultShape />}
        {data.attID === "4" && <LaunchGroupShape />}

        <Handle
          type="source"
          position={Position.Right}
          id={"start"}
          isConnectable={isConnectable}
          style={{
            width: "15px",
            height: "15px",
            right: "-10px",
          }}
        />
        <h5 className={css.shape_node_title}>{data.label}</h5>
      </Box>
    </>
  );
};

export default StartFunctionNode;
