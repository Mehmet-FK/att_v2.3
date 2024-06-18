import ReactFlow, {
  addEdge,
  Background,
  useEdgesState,
  useNodesState,
  MarkerType,
  ReactFlowProvider,
  ConnectionMode,
  useReactFlow,
  Controls,
} from "reactflow";
import nodeTypes from "./NodeTypes";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import "reactflow/dist/style.css";
import useWorkflow from "@/hooks/useWorkflow";
import edgeTypes from "./EdgeTypes";
import BottomDrawer from "./drawers/BottomDrawer";
import ToolsDrawer from "./drawers/ToolsDrawer";
import { useSelector } from "react-redux";
import useAttensamCalls from "@/hooks/useAttensamCalls";

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

//TODO: Should be fetched from API
const permissionTypes = { User: "0", All: "1" };

const Sheet = () => {
  const [openToolsDrawer, setOpenToolsDrawer] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [infoFormValues, setInfoFormValues] = useState({});
  const { viewTypes, launchTypes } = useSelector(
    (state) => state.attensam.data
  );

  const {
    onSave,
    onRestore,
    onNodeDragStop,
    onDragOver,
    updateHistory,
    isValidConnection,
  } = useWorkflow(setNodes, setEdges);

  const { postWorkflowCall } = useAttensamCalls();

  const onConnect = useCallback(
    (params) => {
      let source = params.source.substring(0, params.source.indexOf("_"));
      let target = params.target.substring(0, params.target.indexOf("_"));

      if (params.sourceHandle === "start") source = launchTypes[source];
      else source = viewTypes[source];
      target = viewTypes[target];

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: params.sourceHandle !== "start" ? "floating" : "default",
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { strokeWidth: 2 },
            sourceID: source,
            targetID: target,
          },
          eds
        )
      );
      updateHistory();
    },
    [setEdges, launchTypes, viewTypes]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      console.log(nodes);

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
      const currentNodes = reactFlowInstance.getNodes();
      const isLaunchExists = currentNodes.find((nds) => nds.type === "launch");
      if (type === "launch") {
        if (isLaunchExists) return;

        newNode = {
          id: getId(name),
          type: "launch",
          position: { x: 70, y: 250 },
          parentNode: "launch-group",
          extent: "parent",
          
          attID: launchTypes[name],
          data: {
            label: `${caption}`,
            attID: launchTypes[name],
          },
        };
      } else {
        newNode = {
          id: getId(name),
          type: name,
          name: "",
          position,
          attID: viewTypes[name],
          data: { label: `${caption}` },
          changeEvent: (e, selectedNode) =>
            setNodes((nds) => [
              ...nds.filter((n) => n.id !== newNode.id),
              { ...selectedNode, name: e.target.value },
            ]),
        };
      }
      setNodes((nds) => nds.concat(newNode));
      updateHistory();
    },
    [reactFlowInstance, launchTypes, viewTypes]
  );

  const handleSubmit = () => {
    if (!edges.length) return;
    const launchEl = edges.find((el) => el.sourceHandle === "start");
    if (!launchEl) return;

    const viewport = reactFlowInstance.getViewport();
    const wfData = {
      Edges: JSON.stringify(edges),
      Nodes: JSON.stringify(nodes),
      Viewport: JSON.stringify(viewport),
      Steps: JSON.stringify(
        nodes
          .filter((n) => n.type !== "group" && n.type !== "launch")
          .map((n) => ({ Name: n.name }))
      ),
      ...infoFormValues,
      PermissionType: Number(infoFormValues.PermissionType),
    };
    wfData["LaunchType"] = launchEl.sourceID;
    console.log(wfData);
    const workflowFormData = new FormData();
    for (const [key, value] of Object.entries(wfData)) {
      workflowFormData.append(`${key}`, value);
      console.log(key, " --- ", workflowFormData.get(`${key}`));
    }

    postWorkflowCall(workflowFormData);
  };




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
        onNodesDelete={updateHistory}
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
      >
        <Background variant="dots" />
        {/* <Controls style={{ bottom: 55 }} /> */}
      </ReactFlow>

      <ToolsDrawer open={openToolsDrawer} setOpen={setOpenToolsDrawer} />
      <BottomDrawer
        onSave={onSave}
        onRestore={onRestore}
        nodes={nodes}
        handleSubmit={handleSubmit}
        infoFormValues={infoFormValues}
        setInfoFormValues={setInfoFormValues}
      />
    </div>
  );
};

export default Sheet;
