import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {addInterviewFailure, addInterviewProgress, addInterviewSuccess} from "../toolkit/addInterviewSlice.js";

export default function* addInterviewSaga() {
    yield all([addInterviewWatcher()]);
}

function* addInterviewWatcher() {
    yield takeLatest("addInterviewSlice/addInterviewFetch", interview);
}

function* interview(action) {
    try {
        yield put(addInterviewProgress());
        const interviewResponse = yield call(interviewWrapper, action.payload);
        console.log(interviewResponse, "interviewResponse")
        yield put(addInterviewSuccess(interviewResponse));
    } catch (err) {
        yield put(addInterviewFailure(err));
    }
}

function* interviewWrapper(interview) {
    return yield new Promise((resolve, reject) => {
        axios
            .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/add_interview`, interview
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