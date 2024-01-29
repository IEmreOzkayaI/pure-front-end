import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {logOutFailure, logOutProgress, logOutSuccess} from "../toolkit/logOutSlice";

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
    return yield new Promise((resolve, reject) => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/log-out`
                , {
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
}