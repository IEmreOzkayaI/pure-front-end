import { useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  updateEdge,
} from "reactflow";

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
import ContextMenu from "./ContextMenu/ContextMenu";
import "./handleStyles.css";

const nodeTypes = {
  actorNode: ActorNode,
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
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);

  const onConnect = useCallback(
    (thisEdge) => {
      setEdges((eds) => {
        const newEdge = {
          ...thisEdge,
          id: `${thisEdge.sourceHandle} -> ${thisEdge.targetHandle}`,
        };
        return addEdge(newEdge, eds);
      });
    },
    [setEdges]
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );
  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
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

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      console.log(event.target);
      setMenu({
        id: node.id,
        top: event.clientX,
        bottom: event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => {
    return setMenu(null);
  }, [setMenu]);

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
          nodeTypes={nodeTypes}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onNodeContextMenu={onNodeContextMenu}
          style={{ backgroundColor: "#fff", borderRadius: "1rem" }}
          onClick={onPaneClick}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <SideBar />
      </ReactFlowProvider>

      {menu && (
        <ContextMenu
          onClick={onPaneClick}
          setNodes={setNodes}
          setEdges={setEdges}
          {...menu}
        />
      )}
    </div>
  );
}
