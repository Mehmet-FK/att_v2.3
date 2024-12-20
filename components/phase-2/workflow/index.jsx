import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  ConnectionMode,
  useReactFlow,
} from "reactflow";
import nodeTypes from "./NodeTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactflow/dist/style.css";
import useWorkflow from "@/hooks/workflow-hooks/useWorkflow";
import edgeTypes from "./EdgeTypes";
import BottomDrawer from "./drawers/bottom-drawer";
import ToolsDrawer from "./drawers/tools-drawer";
import { useSelector } from "react-redux";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useRouter } from "next/router";
import { viewTypeConstants, workflowStepTypeIds } from "@/helpers/Constants";
import RestoreWorkflowConfirmDialog from "./dialogs/RestoreWorkflowConfirmDialog";
import useSessionStorage from "@/hooks/storage-hooks/useSessionStorage";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";

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
  const [openToolsDrawer, setOpenToolsDrawer] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [openRestoreConfirmDialog, setOpenRestoreConfirmDialog] =
    useState(false);

  const { setViewport, getViewport } = useReactFlow();
  const router = useRouter();
  const { postWorkflowCall } = useAttensamCalls();
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
    updateHistory,
    isValidConnection,
    addNodeAndUpdateHistoryOnDrop,
    addEdgeAndUpdateHistoryOnConnect,
  } = useWorkflow();

  const {
    createViewOnDrop,
    deleteWorkflowStep,
    updateSelectedStep,
    setPreviousAndNextStepsOnConnect,
    updateNodesEdgesAndViewport,
    prepareWorkflowStateForPost,
  } = useWorkflowForms();

  const onConnect = (params) => {
    addEdgeAndUpdateHistoryOnConnect(params);
    setPreviousAndNextStepsOnConnect(params);
    const _viewport = reactFlowInstance.getViewport();
    const _edges = reactFlowInstance.getEdges();
    const _nodes = reactFlowInstance.getNodes();
    console.log(_edges);
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
  const handleDeleteNode = (deleted) => {
    deleted.forEach((node) => deleteWorkflowStep(node));
    updateHistory();
  };

  useEffect(() => {
    const viewport = getViewport();

    const handleRouteChange = () => {
      updateNodesEdgesAndViewport(nodes, edges, viewport);
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
      _viewport
    );
    postWorkflowCall(workflowToPost);
  };

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
    <div style={{ width: "100vw", height: "100%" }}>
      <RestoreWorkflowConfirmDialog
        open={openRestoreConfirmDialog}
        setOpen={setOpenRestoreConfirmDialog}
        onConfirm={restoreWorkflowFromLocalStorage}
        onDeny={removeWorkflowFromLocalStorage}
      />
      <h4
        style={{
          position: "absolute",
          top: 70,
          zIndex: 200,
          cursor: "pointer",
          backgroundColor: "#404040",
          padding: "6px 20px",
          borderRadius: "6px",
          color: "#fff",
          textAlign: "center",
          userSelect: "none",
        }}
        onClick={() => setOpenToolsDrawer((prev) => !prev)}
      >
        Tools {openToolsDrawer ? "schließen" : "öffnen"}
      </h4>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={(e, n) => onNodeDragStop(e, n, updateSelectedStep)}
        onNodesDelete={handleDeleteNode}
        onNodeClick={(e, n) => updateSelectedStep(n.id)}
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

      <ToolsDrawer open={openToolsDrawer} />
      <BottomDrawer
        onSubmit={handleSubmit}
        onSave={onSave}
        restoreWorkflowFromLocalStorage={restoreWorkflowFromLocalStorage}
        nodes={nodes}
      />
    </div>
  );
};

export default Sheet;
