import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { addEdge, MarkerType, useReactFlow } from "reactflow";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import useLocalStorage from "@/hooks/storage-hooks/useLocalStorage";
import { toastSuccessNotify } from "@/helpers/ToastNotify";
import {
  launchTypes,
  scannerTypeConstants,
  viewTypeConstants,
} from "@/helpers/Constants";

const KEY_WORKFLOW_LOCALSTORAGE = "atina-flow";
const useWorkflowTool = () => {
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

  const getUniqueID = () => "id" + Math.random().toString(16).slice(2);

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
      updateWorkflowOfLatestState();
    }
  }, [getNodes(), getEdges()]);

  const onUndo = useCallback(() => {
    console.log("undo");
    console.log(redoStackRef.current);
    if (undoStackRef.current.length < 1) return;
    let currentState = rfInstance.toObject();
    currentState = { ...currentState, workflow };
    redoStackRef.current.push(currentState);
    const lastState = undoStackRef.current.pop();
    updateCurrentFlowState(lastState);
    restoreWorkflowState(lastState.workflow);
  }, [undoStackRef.current, getNodes(), getEdges(), workflow]);

  const onRedo = useCallback(() => {
    console.log("redo");
    console.log(redoStackRef.current);
    if (redoStackRef.current.length < 1) return;

    const nextState = redoStackRef.current.pop();
    updateCurrentFlowState(nextState);
    restoreWorkflowState(nextState.workflow);

    undoStackRef.current.push(nextState);
  }, [redoStackRef.current, getNodes(), getEdges()]);

  const onKeydown = (e) => {
    if (e.target != document.body) return;
    e.preventDefault();
    if (e.key === "z" && e.ctrlKey) onUndo();
    if (e.key === "y" && e.ctrlKey) onRedo();
    if (e.key === "s" && e.ctrlKey) onSave(e);
  };

  const onSave = useCallback(
    (e) => {
      e.preventDefault();
      console.log("onSave");
      if (rfInstance) {
        const workflowToLocalStorage = { ...workflow };

        workflowToLocalStorage.nodes = rfInstance.getNodes();
        workflowToLocalStorage.edges = rfInstance.getEdges();
        workflowToLocalStorage.viewport = rfInstance.getViewport();

        setDataToLocalStorage(
          KEY_WORKFLOW_LOCALSTORAGE,
          workflowToLocalStorage
        );
      }

      toastSuccessNotify("Entwurf wurde erfolgreich gespeichert");
    },
    [rfInstance, workflow]
  );

  const restoreWorkflowFromLocalStorage = () => {
    const workflowLocalStorage = getDataFromLocalStorage(
      KEY_WORKFLOW_LOCALSTORAGE
    );
    console.log(workflowLocalStorage);
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

  const createNewLaunchNode = (name, caption, nodeId, viewId) => {
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
        viewId: viewId || _nodeId,
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

    if (isConditionEdge) {
      const nextStepType =
        params.sourceHandle === "a_top"
          ? "nextStepOnConfirm"
          : "nextStepOnCancel";

      setNodes((nodes) =>
        nodes.map((nd) =>
          nd.id === params.source
            ? { ...nd, [nextStepType]: params.target }
            : nd
        )
      );
    }

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
          interactionWidth: 25,
        },
        eds
      )
    );
    saveToHistory();
    return true;
  };

  const updateEdgeAndHistoryOnReconnect = (params, reconnectCallback) => {
    const conditionEdgeIds = ["a_top", "a_bottom"];

    const isConditionEdge = conditionEdgeIds.includes(params.sourceHandle);
    const isTargetHandleConditional = conditionEdgeIds.includes(
      params.targetHandle
    );

    if (
      targetAlreadyExist(params) &&
      !isConditionEdge &&
      !isTargetHandleConditional
    )
      return false;

    if (isConditionEdge) {
      const nextStepType =
        params.sourceHandle === "a_top"
          ? "nextStepOnConfirm"
          : "nextStepOnCancel";

      setNodes((nodes) =>
        nodes.map((nd) =>
          nd.id === params.source
            ? { ...nd, [nextStepType]: params.target }
            : nd
        )
      );
    }

    const edgeType = isConditionEdge ? "smoothstep" : "floating";

    reconnectCallback();
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
    const viewId = launchElement.launchElementId;
    const newLaunchNode = createNewLaunchNode(
      viewType,
      caption,
      nodeId,
      viewId
    );

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

  const restoreExistingWorkflowRelays = (existingWorkflow) => {
    const workflowRelays = existingWorkflow.workflowRelays;

    if (!workflowRelays.length) return null;

    const createdWorkflowRelayNodes = [];
    workflowRelays.forEach((screen) => {
      const viewType = viewTypeConstants.WORKFLOW_RELAY;
      const caption = "Workflow Relay";
      const position = randomPositions(950, 400);
      const newNode = createNewReqularNode(
        viewType,
        caption,
        position,
        screen.workflowStepId,
        screen.workflowRelayId
      );
      createdWorkflowRelayNodes.push(newNode);
    });
    return createdWorkflowRelayNodes;
  };

  const createEdgesBySteps = (existingWorkflow) => {
    const workflowSteps = existingWorkflow?.workflowSteps;
    const modalDialogs = existingWorkflow?.modalDialogs;
    const dialogsMap = modalDialogs.toHashMap("workflowStepId");

    const createdEdges = workflowSteps.flatMap((wfs) => {
      const dialog = dialogsMap[wfs.workflowStepId];

      if (dialog) {
        const node = {
          id: wfs.workflowStepId,
          nextStep: wfs.nextStep,
          ...dialog,
        };

        return createModalEdge(node);
      } else {
        const node = { id: wfs.workflowStepId, ...wfs };

        return createRegularEdge(node);
      }
    });

    return createdEdges.filter((edg) => edg.target && edg.source);
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

  const createRegularEdge = (node) => {
    return {
      id: getUniqueID(),
      source: node.id,
      sourceHandle: "a",
      target: node.nextStep,
      targetHandle: "c",
      type: "floating",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { strokeWidth: 2 },
      sourceID: node.id,
      targetID: node.nextStep,
      interactionWidth: 25,
    };
  };

  const createNewEdge = (sourceId, sourceHandle, target, edgeType) => {
    return {
      id: getUniqueID(),
      source: sourceId,
      sourceHandle: sourceHandle,
      target: target,
      targetHandle: "d",
      type: edgeType || "floating",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { strokeWidth: 2 },
      sourceID: sourceId,
      targetID: target,
      interactionWidth: 25,
    };
  };

  const createModalEdge = (node) => {
    if (node.nextStepOnConfirm || node.nextStepOnCancel) {
      const edgeOnConfirm = createNewEdge(
        node.id,
        "a_top",
        node.nextStepOnConfirm,
        "smoothstep"
      );

      const edgeOnCancel = createNewEdge(
        node.id,
        "a_bottom",
        node.nextStepOnCancel,
        "smoothstep"
      );

      return [edgeOnConfirm, edgeOnCancel];
    } else {
      return createNewEdge(node.id, "a_top", node.nextStep);
    }
  };

  const updateModalDialogNode = (node, step, dialogs) => {
    const dialog = dialogs.find(
      (d) => d.workflowStepId === step.workflowStepId
    );

    const nextStepOnConfirm = dialog?.nextStepOnConfirm;
    const nextStepOnCancel = dialog?.nextStepOnCancel;

    if (nextStepOnConfirm || nextStepOnCancel) {
      return { ...node, nextStepOnConfirm, nextStepOnCancel };
    }

    return node;
  };

  const findVIewIDByWorkflowStep = (stepID, existingWorkflow) => {
    const views = [
      {
        name: "launchElements",
        accessor: "launchElementId",
      },
      {
        name: "workflowRelays",
        accessor: "workflowRelayId",
      },
      {
        name: "scannerDialogs",
        accessor: "scannerDialogId",
      },
      {
        name: "infoScreens",
        accessor: "infoScreenId",
      },
      {
        name: "listViews",
        accessor: "listViewId",
      },
      {
        name: "recordViews",
        accessor: "recordViewId",
      },
      {
        name: "modalDialogs",
        accessor: "modalDialogId",
      },
    ];

    let viewID = "";

    for (const view of views) {
      const viewList = existingWorkflow[view.name];
      const res = viewList.find((v) => v.workflowStepId === stepID);
      if (res) {
        viewID = res[view.accessor];
        break;
      }
    }
    return viewID;
  };

  const updateEdgeAndNodeIds = (existingWorkflow, nodes) => {
    const workflowSteps = existingWorkflow.workflowSteps;
    const modalDialogs = existingWorkflow.modalDialogs;

    const nodesMap = nodes.toHashMap((nd) => nd.name?.replaceAll(" ", ""));

    workflowSteps.forEach((step) => {
      const stepName = step.name.replaceAll(" ", "");

      const node = nodesMap[stepName];
      if (node) {
        const viewID = findVIewIDByWorkflowStep(
          step.workflowStepId,
          existingWorkflow
        );
        const nodeData = {
          ...node.data,
          nodeId: step.workflowStepId,
          viewId: viewID,
        };
        nodesMap[stepName].id = step.workflowStepId;
        nodesMap[stepName].nextStep = step.nextStep;
        nodesMap[stepName].data = nodeData;
      }

      const isModalDialog = node?.viewType === viewTypeConstants.MODALDIALOG;
      if (isModalDialog) {
        const dialog = updateModalDialogNode(
          nodesMap[stepName],
          step,
          modalDialogs
        );
        nodesMap[stepName] = dialog;
      }
    });

    const updatedNodes = Object.values(nodesMap);

    const updatedEdges = updatedNodes.flatMap((node) => {
      if (node.viewType === viewTypeConstants.MODALDIALOG) {
        return createModalEdge(node);
      } else {
        return createRegularEdge(node);
      }
    });

    return {
      updatedNodes,
      updatedEdges: updatedEdges.filter((edg) => edg.source && edg.target),
    };
  };

  const restoreExistingRemoteWorkflowByNodesAndEdges = (
    existingWorkflow,
    _setNodes,
    _setEdges
  ) => {
    const { nodes: nodesStringified, edges: edgesStringified } =
      existingWorkflow;

    const { ok, nodes, edges } = parseNodesAndEdgesFromString(
      nodesStringified,
      edgesStringified
    );

    if (!ok) return false;

    const { updatedNodes, updatedEdges } = updateEdgeAndNodeIds(
      existingWorkflow,
      nodes,
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

    const workflowRelays = restoreExistingWorkflowRelays(existingWorkflow);
    createdNodes = createdNodes.concat(workflowRelays ? workflowRelays : []);

    const createdEdges = createEdgesBySteps(existingWorkflow);
    _setNodes((nds) => nds.concat(createdNodes));
    _setEdges((eds) => eds.concat(createdEdges));
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
    updateEdgeAndHistoryOnReconnect,
    updateEdgeAndNodeIds,
  };
};

export default useWorkflowTool;
