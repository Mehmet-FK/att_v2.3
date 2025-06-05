import FloatingEdge from "@/workflow-manager/components/edges/FloatingEdge";
import { SmoothStepEdge } from "reactflow";

const edgeTypes = {
  floating: FloatingEdge,
  smoothstep: SmoothStepEdge,
};
export default edgeTypes;
