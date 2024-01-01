import {all, put, call, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {logOutProgress, logOutSuccess, logOutFailure} from "../toolkit/logOutSlice";

export default function* logOutSaga() {
    yield all([logOutWatcher()]);
}

function* logOutWatcher() {
    yield takeLatest("logOut/logOutFetch", logOut);
}

function* logOut() {
    try {
        yield put(logOutProgress());
        const logOutResponse = yield call(logOutWrapper);
        yield put(logOutSuccess(logOutResponse));
    } catch (err) {
        yield put(logOutFailure(err));
    }
}

function* logOutWrapper() {
    const promise = yield new Promise((resolve, reject) => {
        axios
            .get("http://localhost:3000/api/user/log-out", {
                withCredentials: true,
            })
            .then((res) => {
                const data = res.data;
                window.location.href = "/";
                resolve(data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
    return promise;
}
