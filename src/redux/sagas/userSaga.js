import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {userFailure, userProgress, userSuccess} from "../toolkit/userSlice";

export default function* logInSaga() {
    yield all([userWatcher()]);
}

function* userWatcher() {
    yield takeLatest("user/userFetch", user);
}

function* user(action) {
    try {
        yield put(userProgress());
        const userResponse = yield call(userWrapper, action.payload);
        yield put(userSuccess(userResponse));
    } catch (err) {
        yield put(userFailure(err));
    }
}

function* userWrapper() {
    return yield new Promise((resolve, reject) => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/current`
                , {
                    withCredentials: true,
                })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data;
                    resolve(data);
                }
            })
            .catch((err) => {
                // if (err.response.status === 401)
                //     window.location.href = "/login";
                reject(err.response.data);
            });
    });
}