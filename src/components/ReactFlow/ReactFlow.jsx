import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";

import CustomNode from "./CustomNode/CustomNode";
import ActorNode from "./ActorNode/ActorNode";
import StartNode from "./StartNode/StartNode";
import ActionStateNode from "./ActionStateNode/ActionStateNode";

import "reactflow/dist/style.css";
import SideBar from "./Sidebar/Sidebar";
import styles from "./ReactFlow.module.scss";

import { useState } from "react";
import DecisionNode from "./DecisionNode/DecisionNode";
import Fork from "./Fork/Fork";
import Join from "./Join/Join";
import EndStateNode from "./EndStateNode/EndStateNode";
import ContextMenu from "../shared/ContextMenu/ContextMenu";

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

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function DiagramFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [targetNodeId, setTargetNodeId] = useState(null);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        console.log("edges", eds);
        console.log("params", params);
        return addEdge(params, eds);
      });
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
        data: { label: `${type}` },
      };
      console.log("new node", newNode);

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className={styles.reactFlowContainer}
      onContextMenu={(event) => {
        if (event.target.id.includes("dndnode")) {
          event.preventDefault();
          setShowContextMenu(true);
          setCursorPosition({ x: event.clientX, y: event.clientY });
          setTargetNodeId(
            event.target.childNodes[0].getAttribute("data-nodeid")
          );
        }
      }}
      onClick={(event) => {
        setShowContextMenu(event.target.tagName.toLowerCase() !== "div");
      }}
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

      {showContextMenu && (
        <ContextMenu
          position={cursorPosition}
          targetNodeId={targetNodeId}
          setNodes={setNodes}
        />
      )}
    </div>
  );
}
