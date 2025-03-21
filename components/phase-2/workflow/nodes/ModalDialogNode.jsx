import css from "@/styles/workflow-tool-styles/workflow-tool-node-styles.module.css";
import { Box } from "@mui/material";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import NodeHandles from "./node-components/Handles";

const ModalDialogNode = ({ data, isConnectable, shape }) => {
  const selectedStepId = useSelector((state) => state.workflow.selectedStepId);

  const isNodeSelected = useMemo(
    () => selectedStepId === data.nodeId,
    [selectedStepId, data.nodeId]
  );
  return (
    <Box className={`${css.node_body} ${isNodeSelected && css.selected_node}`}>
      {shape}

      <h5 className={css.node_title}>{data.label}</h5>
      <NodeHandles isConnectable={isConnectable} />
    </Box>
  );
};

export default ModalDialogNode;
