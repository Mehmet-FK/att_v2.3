import ReactFlow, {
  addEdge,
  Background,
  useEdgesState,
  useNodesState,
  MarkerType,
  ReactFlowProvider,
  ConnectionMode,
  useReactFlow,
} from "reactflow";
import nodeTypes from "./NodeTypes";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import "reactflow/dist/style.css";
import useWorkflow from "@/hooks/useWorkflow";
import edgeTypes from "./EdgeTypes";
import BottomDrawer from "./drawers/BottomDrawer";
import ToolsDrawer from "./drawers/ToolsDrawer";

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

let id = 0;
const getId = (type) => `${type}_${id++}`;

const Sheet = ({ viewTypes, launchTypes }) => {
  const [openToolsDrawer, setOpenToolsDrawer] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { onSave, onRestore, onNodeDragStop, onDragOver, isValidConnection } =
    useWorkflow(setNodes, setEdges, reactFlowInstance);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();

      const name = e.dataTransfer.getData("application/reactflow");
      const caption = e.dataTransfer.getData("caption");
      const type = e.dataTransfer.getData("type");

      // check if the dropped element is valid
      if (typeof name === "undefined" || !name) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      let newNode = {};

      if (type === "launch") {
        newNode = {
          id: getId(name),
          type: "launch",
          position,
          attID: launchTypes[name],
          data: { label: `${caption}`, attID: launchTypes[name] },
        };
      } else {
        newNode = {
          id: getId(name),
          type: name,
          position,
          attID: viewTypes[name],
          data: { label: `${caption}` },
        };
      }
      setNodes((nds) => {
        return nds.concat(newNode);
      });
    },
    [reactFlowInstance, launchTypes, viewTypes]
  );

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
        onNodeDragStop={onNodeDragStop}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[20, 20]}
        panOnScroll
        onEdgeDoubleClick={(e, n) => console.log(n)}
      >
        <Background />
        {/* <Controls /> */}
      </ReactFlow>

      <ToolsDrawer open={openToolsDrawer} setOpen={setOpenToolsDrawer} />
      <BottomDrawer onSave={onSave} onRestore={onRestore} edges={edges} />
    </>
  );
};

export default Sheet;
