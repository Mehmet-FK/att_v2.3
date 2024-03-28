import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";

const flowKey = "atina-flow";

const useWorkflow = (setNodes, setEdges, rfInstance) => {
  const { setViewport, getIntersectingNodes } = useReactFlow();

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

  const onNodeDragStop = (e, node) => {
    const interNodes = getIntersectingNodes(node);
    const wrapper = interNodes.find((n) => n.type === "group");

    if (!wrapper || node.type !== "launch") return;

    node.parentNode = wrapper.id;
    node.extent = "parent";
    node.position = {
      x: node.positionAbsolute.x - wrapper.position.x,
      y: node.positionAbsolute.y - wrapper.position.y,
    };
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === node.id) n = node;
        return n;
      })
    );
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const isValidConnection = (connection) =>
    connection.target !== connection.source;

  return { onSave, onRestore, onNodeDragStop, onDragOver, isValidConnection };
};

export default useWorkflow;
