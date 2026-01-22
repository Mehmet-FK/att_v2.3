import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  ConnectionMode,
  useReactFlow,
  reconnectEdge,
} from "reactflow";
import nodeTypes from "@/workflow-manager/components/nodes/utils/NodeTypes";
import { useEffect, useState } from "react";
import "reactflow/dist/style.css";
import useWorkflowTool from "@/workflow-manager/hooks/useWorkflowTool";
import edgeTypes from "@/workflow-manager/components/edges/EdgeTypes";
import BottomDrawer from "@/workflow-manager/components/bottom-drawer";
import ToolsDrawer from "@/workflow-manager/components/tools-drawer";
import useWorkflowForms from "@/workflow-manager/hooks/useWorkflowForms";
import { useRouter } from "next/router";
import RestoreWorkflowConfirmDialog from "@/workflow-manager/components/dialogs/RestoreWorkflowConfirmDialog";
import useSessionStorage from "@/hooks/storage-hooks/useSessionStorage";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { AutoCompleteWorkflowProvider } from "@/context/AutoCompleteWorkflowContext";
import { AutoCompleteEntityProvider } from "@/context/AutoCompleteEntityContext";
import {
  createWorkflowJsonFile,
  retrieveContentOfJsonFile,
} from "./utils/exportableWorkflowService";
import CustomSpeedDial from "@/components/ui-components/CustomSpeedDial";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const initialNodes = [
  {
    id: "launch-group",
    type: "group",

    position: { x: 50, y: 120 },
    selectable: false,
    className: "nodrag",
    style: {
      width: 250,
      height: "75%",
      backgroundColor: "#ccc4",
      screenLeft: "",
    },
  },
];
const initialEdges = [];

const Sheet = ({ existingWorkflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [bottomDrawerExpanded, setBottomDrawerExpanded] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [openRestoreConfirmDialog, setOpenRestoreConfirmDialog] =
    useState(false);

  const { setViewport, getViewport } = useReactFlow();
  const router = useRouter();
  const { postWorkflowCall, deleteWorkflowCall } = useAttensamCalls();
  const { isWorkflowSessionExisting, setSessionFlagForWorkflow } =
    useSessionStorage();

  const {
    onSave,
    restoreExistingRemoteWorkflow,
    restoreWorkflowFromLocalStorage,
    removeWorkflowFromLocalStorage,
    isWorkflowExistingInLocalStorage,
    onNodeDragStop,
    onDragOver,
    saveToHistory,
    isValidConnection,
    addNodeAndUpdateHistoryOnDrop,
    addEdgeAndUpdateHistoryOnConnect,
    updateEdgeAndHistoryOnReconnect,
  } = useWorkflowTool();
  const {
    restoreWorkflowState,
    createViewOnDrop,
    deleteWorkflowStep,
    updateSelectedStep,
    setPreviousAndNextStepsOnConnect,
    updatePreviousAndNextStepOnDeleteEdge,
    updateNodesEdgesAndViewport,
    prepareWorkflowStateForPost,
    validateWorkflowForSubmit,
  } = useWorkflowForms();

  const onReconnect = (oldEdge, newConnection) => {
    const reconnectCallback = () =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));

    const isConnected = updateEdgeAndHistoryOnReconnect(
      newConnection,
      reconnectCallback,
    );

    setPreviousAndNextStepsOnConnect(newConnection);
  };

  const onConnect = (params) => {
    const isConnected = addEdgeAndUpdateHistoryOnConnect(params);
    if (!isConnected) return;

    setPreviousAndNextStepsOnConnect(params);
    const _viewport = reactFlowInstance.getViewport();
    const _edges = reactFlowInstance.getEdges();
    const _nodes = reactFlowInstance.getNodes();
    updateNodesEdgesAndViewport(_nodes, _edges, _viewport);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const { viewType, launchTypeId, newNode } =
      addNodeAndUpdateHistoryOnDrop(e);

    if (!newNode) return;

    createViewOnDrop(viewType, newNode.id, launchTypeId);
    const _viewport = reactFlowInstance.getViewport();
    const _edges = reactFlowInstance.getEdges();
    const _nodes = reactFlowInstance.getNodes();
    updateNodesEdgesAndViewport(_nodes, _edges, _viewport);
  };

  const handleClickOnNode = (e, node) => {
    updateSelectedStep(node.id);
    setBottomDrawerExpanded(true);
  };

  const handleDeleteNode = (deletedNodes) => {
    deletedNodes.forEach((node) => deleteWorkflowStep(node));
    saveToHistory();
    const _viewport = reactFlowInstance.getViewport();
    const _edges = reactFlowInstance.getEdges();
    const _nodes = reactFlowInstance.getNodes();
    updateNodesEdgesAndViewport(_nodes, _edges, _viewport);
  };
  const handleDeleteEdge = (deletedEdges) => {
    updatePreviousAndNextStepOnDeleteEdge(deletedEdges);
    saveToHistory();
  };

  useEffect(() => {
    const viewport = getViewport();

    const handleRouteChange = () => {
      updateNodesEdgesAndViewport(nodes, edges, viewport);
      updateSelectedStep("");
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [nodes, edges, reactFlowInstance, router.events]);

  const handleSubmit = () => {
    const _viewport = reactFlowInstance.getViewport();
    const _edges = reactFlowInstance.getEdges();
    const _nodes = reactFlowInstance.getNodes();
    const workflowToPost = prepareWorkflowStateForPost(
      _nodes,
      _edges,
      _viewport,
    );

    const isValidationOK = validateWorkflowForSubmit(workflowToPost);
    if (!isValidationOK) return;
    postWorkflowCall(workflowToPost)
      .then((res) => (res ? router.back() : null))
      .finally((res) => setSubmitLoading(false));
  };

  const handleDeleteWorkflow = () => {
    const { workflowId } = router.query;
    deleteWorkflowCall(workflowId).then((res) =>
      res ? router.push("/workflows") : null,
    );
  };

  const handleExportWorkflow = () => {
    const _viewport = reactFlowInstance.getViewport();
    const _edges = reactFlowInstance.getEdges();
    const _nodes = reactFlowInstance.getNodes();
    const workflowToExport = prepareWorkflowStateForPost(
      _nodes,
      _edges,
      _viewport,
    );
    createWorkflowJsonFile(workflowToExport, (downloadURL) => {
      const downloadDate = new Date().toJSON().slice(0, 10).replaceAll("-", "");
      const { caption, workflowId } = workflowToExport;
      const wfCaption = caption.replaceAll(" ", "-");
      const filename = `${downloadDate}_${wfCaption}_${workflowId}.json`;
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = filename;
      link.click();
    });
  };

  const handleImportWorkflowFromJsonFile = () => {
    updateSelectedStep("");
    retrieveContentOfJsonFile((content) => {
      restoreExistingRemoteWorkflow(content, setNodes, setEdges);
      restoreWorkflowState(content);
    });
  };

  const speedDialActions = [
    { icon: <DeleteIcon />, name: "Löschen", onclick: handleDeleteWorkflow },
    {
      icon: <FileDownloadIcon />,
      name: "Export",
      onclick: handleExportWorkflow,
    },
    {
      icon: <FileUploadIcon />,
      name: "Import",
      onclick: handleImportWorkflowFromJsonFile,
    },
    {
      icon: <RestoreIcon />,
      name: "Wiederherstellen",
      onclick: restoreWorkflowFromLocalStorage,
    },
    { icon: <BookmarkAddIcon />, name: "Lokal Speichern", onclick: onSave },
    { icon: <SaveIcon />, name: "Speichern", onclick: handleSubmit },
  ];

  useEffect(() => {
    if (
      !isWorkflowSessionExisting() &&
      isWorkflowExistingInLocalStorage() &&
      router.query.workflowId === "new"
    ) {
      setOpenRestoreConfirmDialog(true);
      setSessionFlagForWorkflow();
    }
  }, []);

  useEffect(() => {
    if (existingWorkflow) {
      restoreExistingRemoteWorkflow(existingWorkflow, setNodes, setEdges);
    }
  }, [existingWorkflow]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
      }}
    >
      <RestoreWorkflowConfirmDialog
        open={openRestoreConfirmDialog}
        setOpen={setOpenRestoreConfirmDialog}
        onConfirm={restoreWorkflowFromLocalStorage}
        onDeny={removeWorkflowFromLocalStorage}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onReconnect={onReconnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={(e, n) => onNodeDragStop(e, n, updateSelectedStep)}
        onNodesDelete={handleDeleteNode}
        onEdgesDelete={handleDeleteEdge}
        onNodeClick={handleClickOnNode}
        onPaneClick={() => updateSelectedStep("")}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        deleteKeyCode={"Delete"}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[20, 20]}
        panOnScroll
      >
        <Background variant="dots" />
        {/* <Controls style={{ bottom: 55 }} /> */}
      </ReactFlow>

      <ToolsDrawer />
      <CustomSpeedDial actions={speedDialActions} />

      <AutoCompleteWorkflowProvider>
        <AutoCompleteEntityProvider>
          <BottomDrawer
            isLoading={submitLoading}
            onExport={handleExportWorkflow}
            onSubmit={handleSubmit}
            handleDeleteWorkflow={handleDeleteWorkflow}
            onSave={onSave}
            restoreWorkflowFromLocalStorage={restoreWorkflowFromLocalStorage}
            nodes={nodes}
            bottomDrawerExpanded={bottomDrawerExpanded}
            setBottomDrawerExpanded={setBottomDrawerExpanded}
          />
        </AutoCompleteEntityProvider>
      </AutoCompleteWorkflowProvider>
    </div>
  );
};

export default Sheet;
