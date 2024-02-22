import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {interviewFailure, interviewProgress, interviewSuccess} from "../toolkit/interviewSlice";

export default function* interviewSaga() {
    yield all([interviewWatcher()]);
}

function* interviewWatcher() {
    yield takeLatest("interview/interviewFetch", interview);
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

function* interviewWrapper(interview_id) {
    return yield new Promise((resolve, reject) => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/get_by_interview_id/${interview_id}`, {
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