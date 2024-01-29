import {all, put, call, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {algorithmFailure, algorithmProgress, algorithmSuccess} from "../../toolkit/compiler/algorithmSlice.js";

export default function* algorithmSaga() {
    yield all([algorithmWatcher()]);
}

function* algorithmWatcher() {
    yield takeLatest("algorithm/algorithmFetch", algorithm);
}

function* algorithm(action) {
    try {
        yield put(algorithmProgress());
        const algorithmResponse = yield call(algorithmWrapper, action.payload);
        yield put(algorithmSuccess(algorithmResponse));
    } catch (err) {
        console.log(err);
        yield put(algorithmFailure(err));
    }
}

function* algorithmWrapper(payload) {
    console.log(payload)
    const promise = yield new Promise((resolve, reject) => {
        axios
            .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/question/run_algorithm`, {_id:payload._id,language: payload.language , code:payload.code}, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json", Accept: "application/json",
                },
            })
            .then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
    return promise;
}