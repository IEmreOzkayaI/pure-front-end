import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import CustomEdge from "./CustomEdge/CustomEdge";
import CustomNode from "./CustomNode/CustomNode";
import ActorNode from "./ActorNode/ActorNode";
import StartNode from "./StartNode/StartNode";
import ActionStateNode from "./ActionStateNode/ActionStateNode";

import "reactflow/dist/style.css";
import SideBar from "./Sidebar/Sidebar";
import styles from "./ReactFlow.module.scss";
import { useRef } from "react";
import { useState } from "react";
import DecisionNode from "./DecisionNode/DecisionNode";
import Fork from "./Fork/Fork";
import Join from "./Join/Join";
import EndStateNode from "./EndStateNode/EndStateNode";
// const edgeTypes = {
//   "custom-edge": CustomEdge,
// };

const nodeTypes = {
  actorNode: ActorNode,
  customNode: CustomNode,
  startNode: StartNode,
  actionStateNode: ActionStateNode,
  decisionNode: DecisionNode,
  fork: Fork,
  join: Join,
  endStateNode: EndStateNode,
};

// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
//   {
//     id: "3",
//     position: { x: 100, y: 100 },
//     data: { value: 123, label: "-" },
//     type: "actorNode",
//   },
//   {
//     id: "6",
//     position: { x: 100, y: 300 },
//     data: { value: 123, label: "startNode" },
//     type: "startNode",
//   },
//   {
//     id: "5",
//     position: { x: 0, y: 400 },
//     data: { value: 123, label: "actionStateNode" },
//     type: "actionStateNode",
//   },
//   {
//     id: "6",
//     position: { x: 0, y: 500 },
//     data: { value: 123, label: "fork" },
//     type: "fork",
//   },
//   {
//     id: "7",
//     position: { x: 100, y: 500 },
//     data: { value: 123, label: "join" },
//     type: "join",
//   },
//   {
//     id: "8",
//     position: { x: 200, y: 500 },
//     data: { value: 123, label: "end" },
//     type: "endStateNode",
//   },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function DiagramFlow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className={styles.reactFlowContainer}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          // edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          style={{ backgroundColor: "#fff" }}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <SideBar />
      </ReactFlowProvider>
    </div>
  );
}
