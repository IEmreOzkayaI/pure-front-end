import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  interviewSignaturedFailure,
  interviewSignaturedProgress,
  interviewSignaturedSuccess,
} from "../toolkit/interviewSignaturedSlice";

export default function* interviewSignaturedSaga() {
  yield all([interviewWatcher()]);
}

function* interviewWatcher() {
  yield takeLatest("interviewSignatured/interviewSignaturedFetch", interview);
}

function* interview(action) {
  try {
    yield put(interviewSignaturedProgress());
    const interviewResponse = yield call(interviewWrapper, action.payload);
    yield put(interviewSignaturedSuccess(interviewResponse));
  } catch (err) {
    yield put(interviewSignaturedFailure(err));
  }
}

function* interviewWrapper(interview_signature) {
    return yield new Promise((resolve, reject) => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/get_by_interview_signature/${interview_signature}`, {
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
