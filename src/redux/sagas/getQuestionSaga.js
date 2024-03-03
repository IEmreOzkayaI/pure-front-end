import {questionFailure, questionProgress, questionSuccess} from "../toolkit/getQuestionSlice.js";
import axios from "axios";
import {all, call, put, takeLatest} from "redux-saga/effects";

export default function* getQuestionSaga() {
    yield all([getQuestionWatcher()]);
}

function* getQuestionWatcher() {
    yield takeLatest("getQuestion/questionFetch", question);
}

function* question(action) {
    try {
        console.log("action", action.payload)
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
            .get(`${import.meta.env.VITE_BACKEND_BASE_URL}api/question/get`, {
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