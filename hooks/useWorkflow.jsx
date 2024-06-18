import { useCallback, useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";

const flowKey = "atina-flow";
const capacity = 100;
const useWorkflow = (setNodes, setEdges) => {
  const { setViewport, getIntersectingNodes } = useReactFlow();

  const flowHistoryRef = useRef(null);
  const currentflowRef = useRef(null);

  const rfInstance = useReactFlow();

  //Creates random id
  const id = () => Math.random().toString(36).substr(2, 8);

  const updateHistory = () => {
    const history = flowHistoryRef.current || [];

    const currentFlow = history.find((f) => f.id === currentflowRef.current);

    if (rfInstance) {
      const newFlow = { ...rfInstance.toObject(), id: id() };
      const isEqual =
        JSON.stringify({ ...newFlow, id: "" }) ===
        JSON.stringify({ ...currentFlow, id: "" });

      if (isEqual) return;

      const index = history.findIndex(
        (item) => item.id === currentflowRef.current
      );
      const slicedArr = history.slice(0, index + 1);

      if (slicedArr.length >= capacity) {
        slicedArr.shift();
      }

      slicedArr.push(newFlow);
      currentflowRef.current = newFlow.id;
      flowHistoryRef.current = slicedArr;
    }
  };
 
  const undo = () => {
    const history = flowHistoryRef.current || [];

    const index = history.findIndex((obj) => obj.id === currentflowRef.current);
    const flow = history[index - 1];
    if (index === 0) {
      const defaultNode = history[index].nodes[0];
      setNodes([defaultNode]);
      setEdges([]);
      currentflowRef.current = history[0].id;
    }
    if (flow) {
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      currentflowRef.current = flow.id;
    }
  };

  const redo = () => {
    const history = flowHistoryRef.current || [];

    const index = history.findIndex((obj) => obj.id === currentflowRef.current);
    const flow = history[index + 1];

    if (flow) {
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      currentflowRef.current = flow.id;
    }
  };

  const onKeydown = (e) => {
    if (e.key === "z" && e.ctrlKey) undo();
    if (e.key === "y" && e.ctrlKey) redo();
  };

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
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

    if (wrapper && node.type === "launch") {
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
    }
    updateHistory();
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const isValidConnection = (connection) => {
    return (
      connection.target !== connection.source &&
      connection.targetHandle !== "start"
    );
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  });

  return {
    onSave,
    onRestore,
    onNodeDragStop,
    onDragOver,
    updateHistory,
    isValidConnection,
    getIntersectingNodes,
  };
};

export default useWorkflow;
