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
      // burda edgeleri iterate et
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
}
