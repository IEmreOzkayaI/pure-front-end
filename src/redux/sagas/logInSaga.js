import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {logInFailure, logInProgress, logInSuccess} from "../toolkit/logInSlice";

export default function* logInSaga() {
	yield all([logInWatcher()]);
}
function* logInWatcher() {
	yield takeLatest("logIn/logInFetch", logIn);
}

function* logIn(action) {
	try {
		yield put(logInProgress());
		const logInResponse = yield call(logInWrapper, action.payload);
		yield put(logInSuccess(logInResponse));
	} catch (err) {
		yield put(logInFailure(err));
	}
}

function* logInWrapper(payload) {
	const {logInForm} = payload;
	return yield new Promise((resolve, reject) => {
		axios
			.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/log-in`, logInForm, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status === 200) {
					const data = res.data;
					resolve(data);
				}
			})
			.catch((err) => {
				reject(err.response.data);
			});
	});
}