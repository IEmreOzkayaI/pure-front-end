import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  diagramFailure,
  diagramProgress,
  diagramSuccess,
} from "../toolkit/diagramSlice";

export default function* diagramSaga() {
  yield all([diagramWatcher()]);
}

function* diagramWatcher() {
  yield takeLatest("diagram/getEdgesAndNodes", diagram);
}

function* diagram(action) {
  try {
    yield put(diagramProgress());
    const diagramResponse = yield call(diagramWrapper, action.payload);
    yield put(diagramSuccess(diagramResponse));
  } catch (err) {
    console.log(err);
    yield put(diagramFailure(err));
  }
}

function* diagramWrapper(payload) {
  return yield new Promise((resolve, reject) => {
    try {
      const { edges, nodes, currentQuestion, setEdges, setNodes } = payload;
      let actors = [],
        actionStateBoxes = [],
        lifeLines = [];
      let plantUML = "@startuml\n";

      if (edges.length === 0 || nodes.length === 0)
        reject("There should be atleast one node or edge");

      if (currentQuestion.question.topic === "Use-Case Diagram") {
        const isDiagramValid = nodes.every((node) => {
          return node.type === "actorNode" || node.type === "actionStateNode";
        });
        if (!isDiagramValid)
          reject("Use case should only contain actor and actionStateNodes");

        nodes.forEach((node) => {
          // find all actors and their edges
          if (node.type === "actorNode") {
            const tempNode = structuredClone(node);
            plantUML += `actor ${tempNode.id} as "${tempNode.data?.label}"\n`;
            const actorsEdges = edges.filter(
              (edge) => edge.source === tempNode.id
            );
            tempNode["edges"] = actorsEdges;
            actors.push(tempNode);
            console.log("tempNode", tempNode);
          }
        });

        nodes.forEach((node) => {
          // find actionStateNodes / useCase shapes
          if (node.type === "actionStateNode") {
            actionStateBoxes.push(node);
            plantUML += `usecase "${node.data?.label}" as ${node.id}\n`;
          }
        });

        edges.forEach((edge) => {
          plantUML += `${edge.source} --> ${edge.target}\n`;
        });
      }

      if (currentQuestion.question.topic === "Sequence Diagram") {
        plantUML = "@startuml\n";
        nodes.forEach((node) => {
          if (node.type === "lifeLine") {
            const tempNode = structuredClone(node);
            const lifeLinesEdges = edges.filter(
              (edge) => edge.source === tempNode.id
            );
            tempNode["edges"] = lifeLinesEdges;
            lifeLines.push(tempNode);
          }
        });

        edges.forEach((edge) => {
          plantUML += `${edge.sourceNodeLabel}_${edge.source} ${
            edge.animated ? "-->" : "->"
          } ${edge.targetNodeLabel}_${edge.target}: ${edge.label} \n`;
        });
      }
      plantUML += "@enduml";
      console.log("lifelines", lifeLines);
      console.log("actionStateBoxes", actionStateBoxes);
      console.log("nodes", nodes);
      console.log("edges", edges);
      console.log("plantUML", plantUML);
      //TODO burda plantUML'i api'ye gönder
      setEdges(edges);
      setNodes(nodes);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
}
