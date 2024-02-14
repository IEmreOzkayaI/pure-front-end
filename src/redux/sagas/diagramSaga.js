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
      const { edges, nodes } = payload;
      let actors = [], actionStateBoxes = []
      let plantUML = "@startuml\n";

      nodes.forEach((node) => { // find all actors and their edges
        if (node.type === "actorNode") {
          const tempNode = structuredClone(node)
          plantUML += `actor ${tempNode.id} as "${tempNode.data?.label}"\n`;
          const actorsEdges = edges.filter((edge) => edge.source === tempNode.id);
          tempNode['edges'] = actorsEdges
          actors.push(tempNode);
          console.log("tempNode", tempNode);
        }
      });

      nodes.forEach((node) => { // find actionStateNodes / useCase shapes
        if (node.type === "actionStateNode") {
          actionStateBoxes.push(node);
          plantUML += `usecase "${node.data?.label}" as ${node.id}\n`;
        }
        // buraya sidebardaki tum itemler icin conditionlar ekle
      });

      edges.forEach((edge)=>{
       plantUML += `${edge.source} --> ${edge.target}\n`
      })


      plantUML += '@enduml'
      console.log("actors", actors);
      console.log("actionStateBoxes", actionStateBoxes);
      console.log("nodes", nodes);
      console.log("edges", edges);
      console.log("plantUML", plantUML);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
}
