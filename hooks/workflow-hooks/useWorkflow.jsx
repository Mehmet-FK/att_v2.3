import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEdge, MarkerType, useReactFlow } from "reactflow";
import useWorkflowForms from "./useWorkflowForms";
import useLocalStorage from "../storage-hooks/useLocalStorage";
import { toastSuccessNotify } from "@/helpers/ToastNotify";
import {
  launchTypes,
  scannerTypeConstants,
  viewTypeConstants,
} from "@/helpers/Constants";

const KEY_WORKFLOW_LOCALSTORAGE = "atina-flow";
const capacity = 100;
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
  const getId = (type) => `${type}_${idRef.current++}`;

  const randomPositions = (xMax = 1000, yMax = 500) => {
    const getRandomValue = (max) => Math.floor(Math.random() * (max / 10)) * 10;

    const randomX = getRandomValue(xMax) + 100;
    const randomY = getRandomValue(yMax);

    return { x: randomX, y: randomY };
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
    return sourceExists !== undefined;
  };

  const createNewLaunchNode = (name, caption, nodeId) => {
    const _nodeId = nodeId ? nodeId : getId(name);
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
      },
    };
  };
  const createNewReqularNode = (name, caption, position, nodeId, viewId) => {
    const _nodeId = nodeId ? nodeId : getId(name);
    return {
      id: _nodeId,
      type: "view",
      viewType: name,
      name: "",
      position,
      data: { label: `${caption}`, nodeId: _nodeId, type: name, viewId },
      changeEvent: (e, selectedNode) =>
        setNodes((nds) => [
          ...nds.filter((n) => n.id !== newNode.id),
          { ...selectedNode, name: e.target.value },
        ]),
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
    } else {
      newNode = createNewReqularNode(viewType, caption, position);
    }

    setNodes((nds) => nds.concat(newNode));
    saveToHistory();
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
    saveToHistory();
  };

  const restoreExistingLaunchElement = (launchElement) => {
    const viewType = launchTypes.find(
      (lt) => lt.id === launchElement.launchType
    ).type;
    const caption = viewType; //TODO: refoctoring is needed
    const nodeId = launchElement.workflowStepId;
    const newLaunchNode = createNewLaunchNode(viewType, caption, nodeId);
    return newLaunchNode;
  };

  const restoreExistingListViews = (listViews) => {
    const createdListViewsNodes = [];
    listViews.forEach((lv) => {
      const viewType = viewTypeConstants.LISTVIEW;
      const caption = "List View";
      const position = randomPositions();
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

  const restoreExistingRecordViews = (recordViews) => {
    const createdRecordViewNodes = [];
    recordViews.forEach((rv) => {
      const viewType = viewTypeConstants.RECORDVIEW;
      const caption = "Record View";
      const position = randomPositions();
      const newNode = createNewReqularNode(
        viewType,
        caption,
        position,
        rv.workflowStepId,
        rv.recordViewId
      );
      createdRecordViewNodes.push(newNode);
      // setNodes((nds) => nds.concat(newNode));
    });
    return createdRecordViewNodes;
  };

  const restoreExistingModalDialogs = (modalDialogs) => {
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

  const restoreExistingScannerDialogs = (scannerDialogs) => {
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

  const restoreExistingEdges = (workflowSteps, _setEdges) => {
    setEdges((eds) =>
      workflowSteps.flatMap((wfs) =>
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

  const restoreExistingRemoteWorkflow = (
    existingWorkflow,
    _setNodes,
    _setEdges
  ) => {
    if (!existingWorkflow) return;
    const launchElement = existingWorkflow.launchElements[0];

    if (launchElement) {
      const launchNode = restoreExistingLaunchElement(launchElement);
      _setNodes((nds) => nds.concat(launchNode));
    }

    const listViews = existingWorkflow.listViews;
    const listNodes = restoreExistingListViews(listViews);
    _setNodes((nds) => nds.concat(listNodes));

    const recordViews = existingWorkflow.recordViews;
    const recordNodes = restoreExistingRecordViews(recordViews);
    _setNodes((nds) => nds.concat(recordNodes));

    const modalDialogs = existingWorkflow.modalDialogs;
    const modalNodes = restoreExistingModalDialogs(modalDialogs);
    _setNodes((nds) => nds.concat(modalNodes));

    const scannerDialogs = existingWorkflow.scannerDialogs;
    const scannerNodes = restoreExistingScannerDialogs(scannerDialogs);
    _setNodes((nds) => nds.concat(scannerNodes));

    const workflowSteps = existingWorkflow.workflowSteps;
    restoreExistingEdges(workflowSteps, _setEdges);
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
  };
};

export default useWorkflow;
