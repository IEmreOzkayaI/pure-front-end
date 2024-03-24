import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getResultByUserIdInterviewIdFailure,
  getResultByUserIdInterviewIdProgress,
  getResultByUserIdInterviewIdSuccess,
} from "../toolkit/getResultByUserIdInterviewIdSlice";

export default function* getResultByUserIdInterviewIdSaga() {
  yield all([getResultByUserIdInterviewIdWatcher()]);
}

function* getResultByUserIdInterviewIdWatcher() {
  yield takeLatest("getResultByUserIdInterviewIdSlice/getResultByUserIdInterviewIdFetch", getResultByUserIdInterviewId);
}

function* getResultByUserIdInterviewId(action) {
  try {
    yield put(getResultByUserIdInterviewIdProgress());
    const getResultByUserIdInterviewIdResponse = yield call(
      getResultByUserIdInterviewIdWrapper,
      action.payload
    );
    yield put(getResultByUserIdInterviewIdSuccess(getResultByUserIdInterviewIdResponse));
  } catch (err) {
    yield put(getResultByUserIdInterviewIdFailure(err));
  }
}

function* getResultByUserIdInterviewIdWrapper(payload) {
    const { user_id, interview_id } = payload;
  return yield new Promise((resolve, reject) => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/api/interview/get_result/${user_id}/${interview_id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}
