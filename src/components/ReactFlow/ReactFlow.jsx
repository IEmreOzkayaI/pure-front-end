import { useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  ReactFlowProvider,
  updateEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import ActorNode from "./ActorNode/ActorNode";
import StartNode from "./StartNode/StartNode";
import ActionStateNode from "./ActionStateNode/ActionStateNode";

import "reactflow/dist/style.css";
import SideBar from "./Sidebar/Sidebar";
import styles from "./ReactFlow.module.scss";

import { useState } from "react";
import DecisionNode from "./DecisionNode/DecisionNode";
import ForkJoin from "./ForkJoin/ForkJoin";
import EndStateNode from "./EndStateNode/EndStateNode";
import ContextMenu from "./ContextMenu/ContextMenu";
import LifeLine from "./LifeLine/LifeLine";
import "./handleStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQuestions } from "../../redux/toolkit/interviewManagementSlice";

const nodeTypes = {
  actorNode: ActorNode,
  startNode: StartNode,
  actionStateNode: ActionStateNode,
  decisionNode: DecisionNode,
  forkjoin: ForkJoin,
  endStateNode: EndStateNode,
  lifeLine: LifeLine,
};

// let id = 0;
const getId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export default function DiagramFlow({ edges, setEdges, nodes, setNodes }) {
  const edgeUpdateSuccessful = useRef(true);
  const dispatch = useDispatch();
  const diagramInfo = useSelector((state) => state.diagramSlice?.diagramInfo);
  const currentQuestion = useSelector(
    (state) => state.interviewManagement?.currentQuestion
  );
  const questions = useSelector(
    (state) => state.interviewManagement?.questions
  );
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const storedInterview = JSON.parse(localStorage.getItem("storedInterview"));
  const checkForDiagramEdges = (storedInterview) => {
    const foundQuestion = storedInterview.questions.find((question)=>question.question._id === currentQuestion.question._id)
    return foundQuestion?.edges || [];
  };
  const checkForDiagramNodes = (storedInterview) => {
    const foundQuestion = storedInterview.questions.find((question)=>question.question._id === currentQuestion.question._id)
    return foundQuestion?.nodes || [];
  };

  useEffect(() => {
    if (currentQuestion) {
      setEdges(checkForDiagramEdges(storedInterview));
      setNodes(checkForDiagramNodes(storedInterview));
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (diagramInfo) {
      const updatedQuestions = questions.map((question) =>
        question.question._id === currentQuestion.question._id
          ? { ...question, user_answer: diagramInfo ,edges:[...edges],nodes:[...nodes]}
          : question
      );
      dispatch(setQuestions(updatedQuestions));
    }
  }, [diagramInfo]);

  const onConnect = useCallback(
    (thisEdge) => {
      setEdges((eds) => {
        const sourceNode = nodes.find((node) => node.id === thisEdge.source);
        const targetNode = nodes.find((node) => node.id === thisEdge.target);
        const newEdge = {
          ...thisEdge,
          id: `${thisEdge.sourceHandle} -> ${thisEdge.targetHandle}`,
          sourceNodeLabel: sourceNode.data.label,
          targetNodeLabel: targetNode.data.label,
        };
        return addEdge(newEdge, eds);
      });
    },
    [setEdges, nodes]
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

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      // const pane = reactFlowInstance.getBoundingClientRect();
      console.log("node", node);
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

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onEdgeContextMenu = useCallback(
    (event, edge) => {
      // Prevent native context menu from showing
      event.preventDefault();
      console.log("edge", edge);
      setMenu({
        id: edge.id,
        top: event.clientX,
        bottom: event.clientY,
        edgeType: edge.animated ? "Dashed" : "Solid",
      });
    },
    [setMenu]
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
          nodeTypes={nodeTypes}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onNodeContextMenu={onNodeContextMenu}
          style={{ backgroundColor: "#fff" }}
          onClick={onPaneClick}
          connectionMode="loose"
          onEdgeContextMenu={onEdgeContextMenu}
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
