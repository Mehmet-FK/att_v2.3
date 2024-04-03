import { useCallback, useEffect, useState } from "react";
import { useReactFlow } from "reactflow";

const flowKey = "atina-flow";
const capacity = 100;
const useWorkflow = (setNodes, setEdges, rfInstance) => {
  const { setViewport, getIntersectingNodes } = useReactFlow();
  const [historyId, setHistoryId] = useState("");
  const [flowHistory, setFlowHistory] = useState([]);

  //Creates random id
  const id = () => Math.random().toString(36).substr(2, 8);

  const updateHistory = () => {
    const historyArr = flowHistory;
    const currentFlow = flowHistory.find((f) => f.id === historyId);

    if (rfInstance) {
      const newFlow = { ...rfInstance.toObject(), id: id() };
      const isEqual =
        JSON.stringify({ ...newFlow, id: "" }) ===
        JSON.stringify({ ...currentFlow, id: "" });

      if (isEqual) return;

      setHistoryId(newFlow.id);
      if (historyArr.length < capacity) {
        historyArr.push(newFlow);
      } else {
        historyArr.shift();
        historyArr.push(newFlow);
      }
      setFlowHistory(historyArr);
      const fh = flowHistory.map((f) => f.id);
      console.log(fh);
      console.log(newFlow.id);
      console.log(historyId);
    }
  };

  const undo = () => {
    const history = flowHistory;
    const index = history.findIndex((obj) => obj.id === historyId);
    const flow = history[index - 1];
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
      setHistoryId(flow.id);
    }
  };

  const redo = () => {
    const history = flowHistory;
    const index = history.findIndex((obj) => obj.id === historyId);
    const flow = history[index + 1];
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
      setHistoryId(flow.id);
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
  };
};

export default useWorkflow;
