import ReactFlow, {
  addEdge,
  Background,
  useEdgesState,
  useNodesState,
  MarkerType,
  ReactFlowProvider,
  ConnectionMode,
} from "reactflow";
import nodeTypes from "./NodeTypes";
import { useCallback, useEffect, useState } from "react";
import "reactflow/dist/style.css";
import useWorkflow from "@/hooks/useWorkflow";
import edgeTypes from "./EdgeTypes";
import BottomDrawer from "./BottomDrawer";
import ToolsDrawer from "./ToolsDrawer";

const initialNodes = [];
const initialEdges = [];

let id = 0;
const getId = (type) => `${type}_${id++}`;

const Sheet = () => {
  const [openToolsDrawer, setOpenToolsDrawer] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { onSave, onRestore } = useWorkflow(
    setNodes,
    setEdges,
    reactFlowInstance
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();

      const type = e.dataTransfer.getData("application/reactflow");
      const caption = e.dataTransfer.getData("caption");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });
      const newNode = {
        id: getId(type),
        type,
        position,
        data: { label: `${caption}` },
      };

      setNodes((nds) => {
        return nds.concat(newNode);
      });
    },
    [reactFlowInstance]
  );
  const isValidConnection = (connection) =>
    connection.target !== connection.source;

  return (
    <>
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
        }}
        onClick={() => setOpenToolsDrawer((prev) => !prev)}
      >
        Sidebar {openToolsDrawer ? "schließen" : "öffnen"}
      </h4>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionMode={ConnectionMode.Loose}
      >
        <Background />
        {/* <Controls /> */}
      </ReactFlow>

      <ToolsDrawer open={openToolsDrawer} setOpen={setOpenToolsDrawer} />
      <BottomDrawer onSave={onSave} onRestore={onRestore} edges={edges} />
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <Sheet />
  </ReactFlowProvider>
);
