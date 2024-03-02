import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  intervieweeListFailure,
  intervieweeListProgress,
  intervieweeListSuccess,
} from "../toolkit/intervieweeListSlice";

export default function* intervieweeListSaga() {
  yield all([intervieweeListWatcher()]);
}

function* intervieweeListWatcher() {
  yield takeLatest("intervieweeList/intervieweeListFetch", intervieweeList);
}

function* intervieweeList(action) {
  try {
    yield put(intervieweeListProgress());
    const intervieweeListResponse = yield call(
      intervieweeListWrapper,
      action.payload
    );
    yield put(intervieweeListSuccess(intervieweeListResponse));
  } catch (err) {
    yield put(intervieweeListFailure(err));
  }
}

function* intervieweeListWrapper(interview_id) {
  return yield new Promise((resolve, reject) => {
    axios
      .get(
        `http://localhost:3001/api/interview/get_interviewees/${interview_id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const data = res.data.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}
