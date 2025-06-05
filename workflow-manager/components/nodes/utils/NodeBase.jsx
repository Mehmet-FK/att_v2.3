import css from "@/styles/workflow-tool-styles/workflow-tool-node-styles.module.css";
import { Box } from "@mui/material";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { viewTypeConstants } from "@/helpers/Constants";
import NodeHandles from "./Handles";

const NodeBase = ({ data, isConnectable, shape }) => {
  const selectedStepId = useSelector((state) => state.workflow.selectedStepId);

  const isNodeSelected = useMemo(
    () => selectedStepId === data.nodeId,
    [selectedStepId, data.nodeId]
  );
  const nodeType = data?.type;
  const nodeLabel = data?.label;
  const isModalDialogNode = nodeType === viewTypeConstants.MODALDIALOG;
  const isLaunchNode = null;

  return (
    <>
      <Box
        className={`${css.node_body} ${isNodeSelected && css.selected_node}`}
      >
        {shape}
        <NodeHandles
          isConnectable={isConnectable}
          isConditionNode={isModalDialogNode}
          isLaunchNode={isLaunchNode}
        />

        <h5 className={css.node_title}>
          <span>{data?.nodeId}</span>
          <br />
          <span>{nodeLabel}</span>
        </h5>
      </Box>
    </>
  );
};

export default NodeBase;
