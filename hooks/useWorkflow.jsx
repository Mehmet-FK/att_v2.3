import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEdge, MarkerType, useReactFlow } from "reactflow";
import useWorkflowForms from "./workflow-hooks/useWorkflowForms";

const flowKey = "atina-flow";
const capacity = 100;
const useWorkflow = () => {
  const { setViewport, getIntersectingNodes } = useReactFlow();
  const { restoreWorkflowState } = useWorkflowForms();
  const workflow = useSelector((state) => state.workflow);
  const flowHistoryRef = useRef(null);
  const currentflowRef = useRef(null);
  const idRef = useRef(0);
  const rfInstance = useReactFlow();

  const { setNodes, setEdges, getEdges, getNodes } = rfInstance;

  //Creates random id
  const getId = (type) => `${type}_${idRef.current++}`;
  const createIdForWFHistory = () => Math.random().toString(36).substr(2, 8);

  const isValidConnection = (connection) => {
    return (
      connection.target !== connection.source &&
      connection.targetHandle !== "start"
    );
  };

  const updateHistory = () => {
    const history = flowHistoryRef.current || [];

    const currentFlow = history.find((f) => f.id === currentflowRef.current);

    if (rfInstance) {
      const newFlow = { ...rfInstance.toObject(), id: createIdForWFHistory() };
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
      const flowInfo = workflow;
      localStorage.setItem(flowKey, JSON.stringify({ flow, flowInfo }));
    }
  }, [rfInstance, workflow]);

  const onRestore = () => {
    const restoreFlow = async () => {
      const { flow = null, flowInfo = null } =
        JSON.parse(localStorage.getItem(flowKey)) || {};

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
      if (flowInfo) {
        restoreWorkflowState(flowInfo);
      }
    };

    restoreFlow();
  };
  const targetAlreadyExist = (params) => {
    const edges = getEdges();
    const targetExists = edges.find((edge) => edge.target === params.target);
    return targetExists !== undefined;
  };
  const sourceAlreadyExist = (params) => {
    const edges = getEdges();

    const sourceExists = edges.find((edge) => edge.source === params.source);
    return sourceExists !== undefined;
  };

  const createNewLaunchNode = (name, caption) => {
    const nodeId = getId(name);
    return {
      id: nodeId,
      type: "launch",
      viewType: name,
      position: { x: 70, y: 250 },
      parentNode: "launch-group",
      extent: "parent",

      data: {
        label: `${caption}`,
        nodeId: nodeId,
        type: name,
      },
    };
  };
  const createNewReqularNode = (name, caption, position) => {
    const nodeId = getId(name);
    return {
      id: nodeId,
      type: "view",
      viewType: name,
      name: "",
      position,
      data: { label: `${caption}`, nodeId: nodeId, type: name },
      changeEvent: (e, selectedNode) =>
        setNodes((nds) => [
          ...nds.filter((n) => n.id !== newNode.id),
          { ...selectedNode, name: e.target.value },
        ]),
    };
  };

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

  const isLaunchElementExisting = () => {
    const currentNodes = rfInstance.getNodes();
    const launchElement = currentNodes.find((nds) => nds.type === "launch");
    return launchElement !== undefined;
  };

  const addNodeAndUpdateHistoryOnDrop = (e) => {
    const viewType = e.dataTransfer.getData("application/reactflow");
    const caption = e.dataTransfer.getData("caption");
    const type = e.dataTransfer.getData("type");
    const launchTypeId = e.dataTransfer.getData("typeId");

    const position = rfInstance.screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    let newNode = {};

    //TODO: Refactoring is needed, returns null
    if (type === "launch") {
      if (isLaunchElementExisting()) return { viewType, launchTypeId, newNode };

      newNode = createNewLaunchNode(viewType, caption);
    } else {
      newNode = createNewReqularNode(viewType, caption, position);
    }

    setNodes((nds) => nds.concat(newNode));
    updateHistory();
    return { viewType, launchTypeId, newNode };
  };

  const addEdgeAndUpdateHistoryOnConnect = (params) => {
    if (targetAlreadyExist(params) || sourceAlreadyExist(params)) return;
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: params.sourceHandle !== "start" ? "floating" : "default",
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { strokeWidth: 2 },
          sourceID: params.source,
          targetID: params.target,
        },
        eds
      )
    );
    updateHistory();
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
    sourceAlreadyExist,
    targetAlreadyExist,
    createNewLaunchNode,
    createNewReqularNode,
    addNodeAndUpdateHistoryOnDrop,
    addEdgeAndUpdateHistoryOnConnect,
  };
};

export default useWorkflow;
