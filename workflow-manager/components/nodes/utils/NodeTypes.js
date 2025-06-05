import BaseNode from "@/workflow-manager/components/nodes";
import LaunchGroupNode from "@/workflow-manager/components/nodes/utils/LaunchGroupNode";

const nodeTypes = {
  group: LaunchGroupNode,
  view: BaseNode,
  launch: BaseNode,
};

export default nodeTypes;
