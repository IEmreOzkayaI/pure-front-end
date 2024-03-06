import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  interviewSolveLinkFailure,
  interviewSolveLinkProgress,
  interviewSolveLinkSuccess,
} from "../toolkit/interviewSolveLinkSlice";

export default function* interviewSolveLinkSaga() {
  yield all([interviewSolveLinkWatcher()]);
}
function* interviewSolveLinkWatcher() {
  yield takeLatest(
    "interviewSolveLink/interviewSolveLinkFetch",
    interviewSolveLink
  );
}

function* interviewSolveLink(action) {
  try {
    yield put(interviewSolveLinkProgress());
    const interviewSolveLinkResponse = yield call(
      interviewSolveLinkWrapper,
      action.payload
    );
    yield put(interviewSolveLinkSuccess(interviewSolveLinkResponse));
  } catch (err) {
    yield put(interviewSolveLinkFailure(err));
  }
}

function* interviewSolveLinkWrapper(payload) {
  const { user_id_list, interview_id } = payload;
  return yield new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/send`,
        {
          user_id_list,
          interview_id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
