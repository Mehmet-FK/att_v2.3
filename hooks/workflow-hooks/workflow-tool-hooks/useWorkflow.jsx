import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEdge, MarkerType, useReactFlow } from "reactflow";
import useWorkflowForms from "../workflow-form-hooks/useWorkflowForms";
import useLocalStorage from "../../storage-hooks/useLocalStorage";
import { toastSuccessNotify } from "@/helpers/ToastNotify";
import {
  launchTypes,
  scannerTypeConstants,
  viewTypeConstants,
} from "@/helpers/Constants";

const KEY_WORKFLOW_LOCALSTORAGE = "atina-flow";
const useWorkflow = () => {
  const { setViewport, getIntersectingNodes } = useReactFlow();
  const { restoreWorkflowState } = useWorkflowForms();
  const {
    getDataFromLocalStorage,
    setDataToLocalStorage,
    removeDataFromLocalStorage,
  } = useLocalStorage();

  const workflow = useSelector((state) => state.workflow);

  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);

  const idRef = useRef(0);
  const rfInstance = useReactFlow();

  const { setNodes, setEdges, getEdges, getNodes } = rfInstance;

  //Creates random id
  const generateID = (type) => `${type}_${idRef.current++}`;

  const randomPositions = (x, y, xMax = 1000, yMax = 500) => {
    const getRandomValue = (max) => Math.floor(Math.random() * (max / 10)) * 10;

    const coordinateX = x ? x : getRandomValue(xMax) + 100;
    const coordinateY = y ? y : getRandomValue(yMax);

    return { x: coordinateX, y: coordinateY };
  };

  const isValidConnection = (connection) => {
    return (
      connection.target !== connection.source &&
      connection.targetHandle !== "start"
    );
  };

  const updateCurrentFlowState = (state) => {
    setNodes(state.nodes);
    setEdges(state.edges);
  };

  const simplifyFlowState = (state) => {
    return {
      edges: state.edges,
      nodes: state.nodes.map((node) => ({
        position: node.position,
        positionAbsolute: node.positionAbsolute,
        id: node.id,
        data: node.data,
      })),
    };
  };
  const didStateChange = (currentState) => {
    if (undoStackRef.current.length < 1) return true;
    const previousState = undoStackRef.current.at(-1);
    const current = simplifyFlowState(currentState);
    const previous = simplifyFlowState(previousState);
    return JSON.stringify(current) !== JSON.stringify(previous);
  };

  const didWorkflowChange = () => {
    if (undoStackRef.current.length < 1) return false;
    const previousState = undoStackRef.current.at(-1);

    const current = { ...workflow, selectedStepId: "" };
    const previous = { ...previousState.workflow, selectedStepId: "" };
    return JSON.stringify(current) !== JSON.stringify(previous);
  };

  const updateWorkflowOfLatestState = () => {
    let latestState = undoStackRef.current.pop();
    latestState = { ...latestState, workflow };
    undoStackRef.current.push(latestState);
  };

  const saveToHistory = useCallback(() => {
    let newState = rfInstance.toObject();
    newState = { ...newState, workflow };
    if (didStateChange(newState)) {
      undoStackRef.current.push(newState);
      redoStackRef.current = [];
    } else if (didWorkflowChange()) {
      console.log("update workflow of latest state");
      updateWorkflowOfLatestState();
    }
  }, [getNodes(), getEdges()]);

  const onUndo = useCallback(() => {
    if (undoStackRef.current.length < 1) return;
    let currentState = rfInstance.toObject();
    currentState = { ...currentState, workflow };
    redoStackRef.current.push(currentState);
    const lastState = undoStackRef.current.pop();
    updateCurrentFlowState(lastState);
    restoreWorkflowState(lastState.workflow);
  }, [undoStackRef.current, getNodes(), getEdges(), workflow]);

  const onRedo = useCallback(() => {
    if (redoStackRef.current.length < 1) return;

    const nextState = redoStackRef.current.pop();
    updateCurrentFlowState(nextState);
    restoreWorkflowState(nextState.workflow);

    undoStackRef.current.push(nextState);
  }, [redoStackRef.current, getNodes(), getEdges()]);

  const onKeydown = (e) => {
    if (e.key === "z" && e.ctrlKey) onUndo();
    if (e.key === "y" && e.ctrlKey) onRedo();
  };

  const onSave = useCallback(() => {
    if (rfInstance) {
      const workflowToLocalStorage = { ...workflow };

      workflowToLocalStorage.nodes = rfInstance.getNodes();
      workflowToLocalStorage.edges = rfInstance.getEdges();
      workflowToLocalStorage.viewport = rfInstance.getViewport();

      setDataToLocalStorage(KEY_WORKFLOW_LOCALSTORAGE, workflowToLocalStorage);
    }

    toastSuccessNotify("Entwurf wurde erfolgreich gespeichert");
  }, [rfInstance, workflow]);

  const restoreWorkflowFromLocalStorage = () => {
    const workflowLocalStorage = getDataFromLocalStorage(
      KEY_WORKFLOW_LOCALSTORAGE
    );
    if (!workflowLocalStorage) return;

    const { x = 0, y = 0, zoom = 1 } = workflowLocalStorage?.viewport;

    setNodes(workflowLocalStorage?.nodes || []);
    setEdges(workflowLocalStorage?.edges || []);
    setViewport({ x, y, zoom });

    restoreWorkflowState(workflowLocalStorage);
  };

  const isWorkflowExistingInLocalStorage = () => {
    const workflowLocalStorage = getDataFromLocalStorage(
      KEY_WORKFLOW_LOCALSTORAGE
    );

    return workflowLocalStorage !== null;
  };

  const removeWorkflowFromLocalStorage = () => {
    removeDataFromLocalStorage(KEY_WORKFLOW_LOCALSTORAGE);
  };

  const targetAlreadyExist = (params) => {
    const edges = getEdges();
    const targetExists = edges.find((edge) => edge.target === params.target);
    return targetExists !== undefined;
  };
  const sourceAlreadyExist = (params) => {
    const edges = getEdges();

    const sourceExists = edges.find((edge) => edge.source === params.source);
    console.log(edges);
    return sourceExists !== undefined;
  };

  const createNewLaunchNode = (name, caption, nodeId) => {
    const _nodeId = nodeId ? nodeId : generateID(name);
    return {
      id: _nodeId,
      type: "launch",
      viewType: name,
      position: { x: 70, y: 250 },
      parentNode: "launch-group",
      extent: "parent",

      data: {
        label: `${caption}`,
        nodeId: _nodeId,
        type: name,
        viewId: _nodeId,
      },
    };
  };
  const createNewReqularNode = (name, caption, position, nodeId, viewId) => {
    const _nodeId = nodeId ? nodeId : generateID(name);
    return {
      id: _nodeId,
      type: "view",
      viewType: name,
      name: "",
      position,
      data: {
        label: `${caption}`,
        nodeId: _nodeId,
        type: name,
        viewId: viewId || _nodeId,
      },
    };
  };

  const onNodeDragStop = (e, node, updateSelectedStep) => {
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
    saveToHistory();
    updateSelectedStep(node.id);
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

    if (type === "launch") {
      if (isLaunchElementExisting())
        return { viewType, launchTypeId, newNode: null };

      newNode = createNewLaunchNode(viewType, caption);
    } else if (type === "view") {
      newNode = createNewReqularNode(viewType, caption, position);
    } else {
      return {};
    }

    setNodes((nds) => nds.concat(newNode));
    saveToHistory();
    return { viewType, launchTypeId, newNode };
  };

  const addEdgeAndUpdateHistoryOnConnect = (params) => {
    const conditionEdgeIds = ["a_top", "a_bottom"];

    const isConditionEdge = conditionEdgeIds.includes(params.sourceHandle);

    if (
      (targetAlreadyExist(params) || sourceAlreadyExist(params)) &&
      !isConditionEdge
    )
      return false;

    const edgeType = isConditionEdge ? "smoothstep" : "floating";

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: edgeType,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { strokeWidth: 2 },
          sourceID: params.source,
          targetID: params.target,
        },
        eds
      )
    );
    saveToHistory();
    return true;
  };

  const restoreExistingLaunchElement = (existingWorkflow) => {
    const launchElement = existingWorkflow.launchElements[0];
    if (!launchElement) return null;
    const viewType = launchTypes.find(
      (lt) => lt.id === launchElement.launchType
    )?.type;
    const caption = viewType; //TODO: refoctoring is needed
    const nodeId = launchElement.workflowStepId;
    const newLaunchNode = createNewLaunchNode(viewType, caption, nodeId);

    return newLaunchNode;
  };

  const restoreExistingListViews = (existingWorkflow) => {
    const listViews = existingWorkflow.listViews;

    if (!listViews.length) return null;

    const createdListViewsNodes = [];
    const initialX = 450;
    listViews.forEach((lv, index) => {
      const viewType = viewTypeConstants.LISTVIEW;
      const caption = "List View";
      const positionX = initialX * (index + 1);
      const position = randomPositions(positionX, 400);
      const newNode = createNewReqularNode(
        viewType,
        caption,
        position,
        lv.workflowStepId,
        lv.listViewId
      );
      createdListViewsNodes.push(newNode);
    });
    return createdListViewsNodes;
  };

  const restoreExistingRecordViews = (existingWorkflow) => {
    const recordViews = existingWorkflow.recordViews;

    if (!recordViews.length) return null;

    const createdRecordViewNodes = [];
    recordViews.forEach((rv) => {
      const viewType = viewTypeConstants.RECORDVIEW;
      const caption = "Record View";
      const position = randomPositions(750, 400);
      const newNode = createNewReqularNode(
        viewType,
        caption,
        position,
        rv.workflowStepId,
        rv.recordViewId
      );
      createdRecordViewNodes.push(newNode);
    });
    return createdRecordViewNodes;
  };

  const restoreExistingModalDialogs = (existingWorkflow) => {
    const modalDialogs = existingWorkflow.modalDialogs;
    if (!modalDialogs.length) return null;

    const createdModalDialogNodes = [];
    modalDialogs.forEach((md) => {
      const viewType = viewTypeConstants.MODALDIALOG;
      const caption = "Modal Dialog";
      const position = randomPositions();
      const newNode = createNewReqularNode(
        viewType,
        caption,
        position,
        md.workflowStepId,
        md.modalDialogId
      );
      createdModalDialogNodes.push(newNode);
    });
    return createdModalDialogNodes;
  };

  const restoreExistingScannerDialogs = (existingWorkflow) => {
    const scannerDialogs = existingWorkflow.scannerDialogs;
    if (!scannerDialogs.length) return null;

    const createdScannerDialogNodes = [];
    scannerDialogs.forEach((sc) => {
      const viewType =
        sc.scannerType === scannerTypeConstants.NFC
          ? viewTypeConstants.SCANNER_DIALOG_NFC
          : viewTypeConstants.SCANNER_DIALOG_QR;
      const caption =
        (sc.scannerType === scannerTypeConstants.NFC ? "NFC " : "QR ") +
        "Scanner Dialog";
      const position = randomPositions();
      const newNode = createNewReqularNode(
        viewType,
        caption,
        position,
        sc.workflowStepId,
        sc.scannerDialogId
      );
      createdScannerDialogNodes.push(newNode);
    });
    return createdScannerDialogNodes;
  };

  const restoreExistingInfoScreens = (existingWorkflow) => {
    const infoScreens = existingWorkflow.infoScreens;

    if (!infoScreens.length) return null;

    const createdInfoScreenNodes = [];
    infoScreens.forEach((screen) => {
      const viewType = viewTypeConstants.INFO_SCREEN;
      const caption = "Info Screen";
      const position = randomPositions(950, 400);
      const newNode = createNewReqularNode(
        viewType,
        caption,
        position,
        screen.workflowStepId,
        screen.infoScreenId
      );
      createdInfoScreenNodes.push(newNode);
    });
    return createdInfoScreenNodes;
  };

  const restoreExistingEdges = (workflowSteps, _setEdges) => {
    setEdges((eds) =>
      workflowSteps.flatMap(
        (wfs) =>
          wfs.nextStep &&
          addEdge(
            {
              source: wfs.workflowStepId,
              sourceHandle: "a",
              target: wfs.nextStep,
              targetHandle: "c",
              type: "floating",
              markerEnd: { type: MarkerType.ArrowClosed },
              style: { strokeWidth: 2 },
              sourceID: wfs.workflowStepId,
              targetID: wfs.nextStep,
            },
            []
          )
      )
    );
  };

  const parseNodesAndEdgesFromString = (nodes, edges) => {
    try {
      const nodesObject = JSON.parse(nodes);
      const edgesObject = JSON.parse(edges);
      return { ok: true, nodes: nodesObject, edges: edgesObject };
    } catch (error) {
      console.log({ JSONPARSE_ERROR: error });
      return { ok: false, nodes: null, edges: null };
    }
  };

  const reorderWorkflowSteps = (workflowSteps) => {
    const stepMap = workflowSteps.toHashMap("workflowStepId");

    const launchStep = workflowSteps.find(
      (wfs) =>
        wfs.name.toLowerCase().includes("launch") || wfs.previousStep === ""
    );
    const orderedSteps = [launchStep];
    let currentStep = launchStep;
    while (currentStep?.nextStep) {
      currentStep = stepMap[currentStep.nextStep];
      orderedSteps.push(currentStep);
    }

    workflowSteps.forEach((step) => {
      const isConnected = orderedSteps.find(
        (ordStep) => ordStep.workflowStepId === step.workflowStepId
      );
      if (!isConnected) {
        orderedSteps.push(step);
      }
    });

    return orderedSteps;
  };

  const reorderNodesByConnection = (nodes, edges) => {
    const nodesMap = nodes.toHashMap("id");

    edges.forEach(({ source, target, ...edge }) => {
      if (!source || !target) return;

      if (edge?.sourceHandle === "a_top") {
        nodesMap[source].nextStepOnConfirm = target;
      } else if (edge?.sourceHandle === "a_bottom") {
        nodesMap[source].nextStepOnCancel = target;
      }
      if (nodesMap[source]) {
        nodesMap[source].nextStep = target;
      }
      if (nodesMap[target]) {
        nodesMap[target].previousStep = source;
      }
    });
    console.log({ nodesMap });
    const launchNode = Object.values(nodesMap).find(
      (node) =>
        node.type === "launch" || (node.type !== "group" && !node.previousStep)
    );

    const addedNodeList = [];
    const orderedNodes = [launchNode];

    let currentNode = launchNode;

    while (currentNode?.nextStep) {
      currentNode = nodesMap[currentNode.nextStep];
      if (!currentNode) break;
      if (
        addedNodeList.includes(currentNode.id) &&
        currentNode.type !== "ModalDialog"
      ) {
        currentNode = undefined;
        continue;
      }

      orderedNodes.push(currentNode);
      addedNodeList.push(currentNode?.id);
    }

    const connectedNodeIds = edges.flatMap((edge) => [
      edge.source,
      edge.target,
    ]);
    nodes.forEach((node) => {
      const isConnected = connectedNodeIds.includes(node.id);
      if (!isConnected && node.type !== "group") {
        orderedNodes.push(node);
      }
    });

    return orderedNodes;
  };

  const updateNodeId = (node, step) => {
    console.log({ step });
    const nodeData = node?.data;
    const stepID = step?.workflowStepId;

    return stepID
      ? {
          ...node,
          id: stepID,
          data: { ...nodeData, nodeId: stepID, viewId: stepID },
        }
      : null;
  };

  const updateEdgeId = (edge, step, node) => {
    const sourceID = step?.workflowStepId;
    const targetID = step?.nextStep;
    let tempEdge = {
      ...edge,
      source: sourceID,
      sourceID: sourceID,
      target: targetID,
      targetID,
    };
    if (edge?.sourceHandle === "a_top") {
      tempEdge = {
        ...tempEdge,
        source: node.id,
        sourceID: node.id,
        target: node?.nextStepOnConfirm,
        targetID: node?.nextStepOnConfirm,
      };
    } else if (edge?.sourceHandle === "a_bottom") {
      tempEdge = {
        ...tempEdge,
        source: node.id,
        sourceID: node.id,
        target: node?.nextStepOnCancel,
        targetID: node?.nextStepOnCancel,
      };
    }

    return tempEdge;
  };

  const updateEdgeAndNodeIds = (orderedSteps, orderedNodes, edges) => {
    const updatedNodes = [];
    const updatedEdges = [];

    const edgesMap = edges.toHashMap((edg) => edg.source + "-" + edg.target);
    orderedSteps.forEach((step, index) => {
      const node = orderedNodes[index];

      const updatedNode = updateNodeId(node, step);
      if (updatedNode) {
        updatedNodes.push(updatedNode);
      }

      const edge = edgesMap[node?.id + "-" + node.nextStep];
      const isModalDialog = node.viewType === "ModalDialog";
      if (isModalDialog) {
        const confirmEdge = edgesMap[node.id + "-" + node.nextStepOnConfirm];
        const cancelEdge = edgesMap[node.id + "-" + node.nextStepOnCancel];
        const updatedConfirmEdge = updateEdgeId(confirmEdge, step, node);
        const updatedCancelEdge = updateEdgeId(cancelEdge, step, node);
        updatedEdges.push(updatedConfirmEdge);
        updatedEdges.push(updatedCancelEdge);
      } else {
        const updatedEdge = updateEdgeId(edge, step, node);
        if (updatedEdge) {
          updatedEdges.push(updatedEdge);
        }
      }
    });
    return { updatedNodes, updatedEdges };
  };

  const restoreExistingRemoteWorkflowByNodesAndEdges = (
    existingWorkflow,
    _setNodes,
    _setEdges
  ) => {
    const {
      nodes: nodesStringified,
      edges: edgesStringified,
      workflowSteps,
    } = existingWorkflow;

    const { ok, nodes, edges } = parseNodesAndEdgesFromString(
      nodesStringified,
      edgesStringified
    );

    if (!ok) return false;

    const orderedSteps = reorderWorkflowSteps(workflowSteps);
    const orderedNodes = reorderNodesByConnection(nodes, edges);

    const { updatedNodes, updatedEdges } = updateEdgeAndNodeIds(
      orderedSteps,
      orderedNodes,
      edges
    );

    const launchWrapperNode = nodes.find((n) => n.id === "launch-group");
    updatedNodes.unshift(launchWrapperNode);

    _setNodes(updatedNodes);
    _setEdges(updatedEdges);

    return true;
  };

  const restoreExistingRemoteWorkflowBySteps = (
    existingWorkflow,
    _setNodes,
    _setEdges
  ) => {
    let createdNodes = [];

    const launchNode = restoreExistingLaunchElement(existingWorkflow);
    createdNodes = createdNodes.concat(launchNode ? launchNode : []);

    const listNodes = restoreExistingListViews(existingWorkflow);
    createdNodes = createdNodes.concat(listNodes ? listNodes : []);

    const recordNodes = restoreExistingRecordViews(existingWorkflow);
    createdNodes = createdNodes.concat(recordNodes ? recordNodes : []);

    const modalNodes = restoreExistingModalDialogs(existingWorkflow);
    createdNodes = createdNodes.concat(modalNodes ? modalNodes : []);

    const scannerNodes = restoreExistingScannerDialogs(existingWorkflow);
    createdNodes = createdNodes.concat(scannerNodes ? scannerNodes : []);

    const infoScreens = restoreExistingInfoScreens(existingWorkflow);
    createdNodes = createdNodes.concat(infoScreens ? infoScreens : []);

    _setNodes((nds) => nds.concat(createdNodes));
    const workflowSteps = existingWorkflow.workflowSteps;
    restoreExistingEdges(workflowSteps, _setEdges);
  };

  const restoreExistingRemoteWorkflow = (
    existingWorkflow,
    _setNodes,
    _setEdges
  ) => {
    let isParseSuccessfull = false;
    if (existingWorkflow?.nodes && existingWorkflow?.edges) {
      isParseSuccessfull = restoreExistingRemoteWorkflowByNodesAndEdges(
        existingWorkflow,
        _setNodes,
        _setEdges
      );
    }

    if (!isParseSuccessfull) {
      restoreExistingRemoteWorkflowBySteps(
        existingWorkflow,
        _setNodes,
        _setEdges
      );
    }
  };

  const initializeWorkflowLabel = (label, _setNodes) => {
    _setNodes((nds) => {
      const first = { ...nds[0], data: { label: label || "test" } };
      const rest = nds.slice(1);
      return [first, ...rest];
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  });

  return {
    onSave,
    restoreExistingRemoteWorkflow,
    restoreWorkflowFromLocalStorage,
    removeWorkflowFromLocalStorage,
    isWorkflowExistingInLocalStorage,
    onNodeDragStop,
    onDragOver,
    saveToHistory,
    isValidConnection,
    getIntersectingNodes,
    sourceAlreadyExist,
    targetAlreadyExist,
    createNewLaunchNode,
    createNewReqularNode,
    addNodeAndUpdateHistoryOnDrop,
    addEdgeAndUpdateHistoryOnConnect,
    initializeWorkflowLabel,
  };
};

export default useWorkflow;
