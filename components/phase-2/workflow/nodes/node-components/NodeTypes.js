import BaseNode from "@/components/phase-2/workflow/nodes/";
import LaunchGroupNode from "@/components/phase-2/workflow/nodes/LaunchGroupNode";

const nodeTypes = {
  group: LaunchGroupNode,
  view: BaseNode,
  launch: BaseNode,
};

export default nodeTypes;
