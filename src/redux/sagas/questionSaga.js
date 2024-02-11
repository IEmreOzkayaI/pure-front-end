import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {questionFailure, questionProgress, questionSuccess} from "../toolkit/questionSlice";

export default function* questionSaga() {
    yield all([questionWatcher()]);
}

function* questionWatcher() {
    yield takeLatest("question/questionFetch", question);
}

function* question(action) {
    try {
        console.log("action",action.payload)
        yield put(questionProgress());
        const questionResponse = yield call(questionWrapper, action.payload);
        yield put(questionSuccess(questionResponse));
    } catch (err) {
        yield put(questionFailure(err));
    }
}

function* questionWrapper(payload) {
    return yield new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:3001/api/question/`, {
                withCredentials: true,
                params: payload, // payload'ı query string olarak gönder
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