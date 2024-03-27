import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";

const flowKey = "atina-flow";

const useWorkflow = (setNodes, setEdges, rfInstance) => {
  const { setViewport } = useReactFlow();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    // console.log(JSON.parse(localStorage.getItem(flowKey)));
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  return { onSave, onRestore };
};

export default useWorkflow;
