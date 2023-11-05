import {all, put, call, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {authProgress, authSuccess, authFailure} from "../toolkit/authSlice";

export default function* authSaga() {
	yield all([authWatcher()]);
}
function* authWatcher() {
	yield takeLatest("auth/authFetch", auth);
}

function* auth(action) {
	try {
		yield put(authProgress());
		const authResponse = yield call(authWrapper, action.payload);
		yield put(authSuccess(authResponse));
	} catch (err) {
		yield put(authFailure(err));
	}
}

function* authWrapper(payload) {
	const promise = yield new Promise((resolve, reject) => {
		axios
			.post("https://pure-backend.azurewebsites.net/api/user/register", payload, {
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
	return promise;
}
