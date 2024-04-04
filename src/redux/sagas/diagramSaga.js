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
      const { edges, nodes, currentQuestion } = payload;
      let actors = [],
        actionStateBoxes = [],
        lifeLines = [];
      let plantUML = "@startuml\n";

      if (currentQuestion.question.topic === "Use-Case Diagram") {

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
      resolve(plantUML);
    } catch (error) {
      reject(error);
    }
  });
}
