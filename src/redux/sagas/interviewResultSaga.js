import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  interviewResultFailure,
  interviewResultProgress,
  interviewResultSuccess,
} from "../toolkit/interviewResultSlice";

export default function* interviewResultSaga() {
  yield all([interviewResultWatcher()]);
}

function* interviewResultWatcher() {
  yield takeLatest("interviewResult/interviewResultFetch", interviewResult);
}

function* interviewResult(action) {
  try {
    yield put(interviewResultProgress());
    const interviewResultResponse = yield call(interviewResultWrapper, action.payload);
    yield put(interviewResultSuccess(interviewResultResponse));
  } catch (err) {
    yield put(interviewResultFailure(err));
  }
}

function* interviewResultWrapper(interview_result_signature) {
    return yield new Promise((resolve, reject) => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/get_result/${interview_result_signature}`, {
                withCredentials: true,
            })
            .then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
}
