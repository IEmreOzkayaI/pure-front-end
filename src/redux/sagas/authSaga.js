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
			.post(
				"https://the-pure-backend.cyclic.app/api/user/login",
				{auth_credential: payload.auth_credential},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				if (res.status === 200) window.location.replace("/");
				const data = res.data;
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});

	return promise;
}
