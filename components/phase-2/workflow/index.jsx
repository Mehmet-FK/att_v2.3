import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  ConnectionMode,
  useReactFlow,
} from "reactflow";
import nodeTypes from "@/components/phase-2/workflow/nodes/node-components/NodeTypes";
import { useEffect, useState } from "react";
import "reactflow/dist/style.css";
import useWorkflow from "@/hooks/workflow-hooks/workflow-tool-hooks/useWorkflow";
import edgeTypes from "@/components/phase-2/workflow/edges/EdgeTypes";
import BottomDrawer from "./drawers/bottom-drawer";
import ToolsDrawer from "./drawers/tools-drawer";
import useWorkflowForms from "@/hooks/workflow-hooks/workflow-form-hooks/useWorkflowForms";
import { useRouter } from "next/router";
import RestoreWorkflowConfirmDialog from "./dialogs/RestoreWorkflowConfirmDialog";
import useSessionStorage from "@/hooks/storage-hooks/useSessionStorage";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { AutoCompleteWorkflowProvider } from "@/context/AutoCompleteWorkflowContext";
import { AutoCompleteEntityProvider } from "@/context/AutoCompleteEntityContext";

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
    saveToHistory,
    isValidConnection,
    addNodeAndUpdateHistoryOnDrop,
    addEdgeAndUpdateHistoryOnConnect,
    initializeWorkflowLabel,
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
    updateNodesEdgesAndViewport(_nodes, _edges, _viewport);
  };

  const onDrop = (e) => {
    e.preventDefault();
    console.log({ nodes });
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
  };
  const handleDeleteEdge = (deletedEdges) => {
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
      _viewport
    );
    console.log({ workflowToPost });
    postWorkflowCall(workflowToPost).then((res) =>
      res ? router.push("/workflows") : null
    );
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

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
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

      <AutoCompleteWorkflowProvider>
        <AutoCompleteEntityProvider>
          <BottomDrawer
            onSubmit={handleSubmit}
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
