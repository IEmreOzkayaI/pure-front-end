import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  interviewFailure,
  interviewProgress,
  interviewSuccess,
} from "../toolkit/getInterviewByCompanyIdSlice";

export default function* getInterviewByCompanyIdSaga() {
  yield all([interviewWatcher()]);
}

function* interviewWatcher() {
  yield takeLatest("getInterviewByCompanyId/interviewFetch", interview);
}

function* interview(action) {
  try {
    yield put(interviewProgress());
    const interviewResponse = yield call(interviewWrapper, action.payload);
    yield put(interviewSuccess(interviewResponse));
  } catch (err) {
    yield put(interviewFailure(err));
  }
}

function* interviewWrapper(company_id) {
  return yield new Promise((resolve, reject) => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/api/interview/get_by_company_id/${company_id}`,
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
