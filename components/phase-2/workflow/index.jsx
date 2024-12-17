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
import useWorkflow from "@/hooks/useWorkflow";
import edgeTypes from "./EdgeTypes";
import BottomDrawer from "./drawers/bottom-drawer";
import ToolsDrawer from "./drawers/tools-drawer";
import { useSelector } from "react-redux";
import useAttensamCalls from "@/hooks/useAttensamCalls";
import useWorkflowForms from "@/hooks/workflow-hooks/useWorkflowForms";
import { useRouter } from "next/router";
import { viewTypeConstants, workflowStepTypeIds } from "@/helpers/Constants";

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

// let id = 0;
// const getId = (type) => `${type}_${id++}`;

const Sheet = () => {
  const [openToolsDrawer, setOpenToolsDrawer] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const workflow = useSelector((state) => state.workflow);

  const { nodes: rdxNodes, edges: rdxEdges, viewport: rdxViewport } = workflow;

  const { setViewport, getViewport } = useReactFlow();
  const router = useRouter();
  const { postWorkflowCall } = useAttensamCalls();

  const {
    onSave,
    onRestore,
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
    console.log(reactFlowInstance.getEdges());
  };

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const { viewType, launchTypeId, newNode } =
        addNodeAndUpdateHistoryOnDrop(e);

      createViewOnDrop(viewType, newNode.id, launchTypeId);
      console.log(reactFlowInstance.getNodes());
    },
    [reactFlowInstance]
  );

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
    prepareWorkflowStateForPost();
  };

  useEffect(() => {
    if (rdxNodes.length > 1) {
      setNodes(rdxNodes);
      setEdges(rdxEdges);
      setViewport(rdxViewport);
    }
  }, [rdxNodes, rdxEdges, rdxViewport]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
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
        onNodeDragStop={onNodeDragStop}
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

      <ToolsDrawer open={openToolsDrawer} setOpen={setOpenToolsDrawer} />
      <BottomDrawer
        onSubmit={handleSubmit}
        onSave={onSave}
        onRestore={onRestore}
        nodes={nodes}
      />
    </div>
  );
};

export default Sheet;
