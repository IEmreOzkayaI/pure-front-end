import {all, put, call, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {confirmProgress, confirmSuccess, confirmFailure} from "../toolkit/confirmSlice";

export default function* confirmSaga() {
	yield all([confirmWatcher()]);
}
function* confirmWatcher() {
	yield takeLatest("confirm/confirmFetch", confirm);
}

function* confirm(action) {
	try {
		yield put(confirmProgress());
		const confirmResponse = yield call(confirmWrapper, action.payload);
		yield put(confirmSuccess(confirmResponse));
	} catch (err) {
		yield put(confirmFailure(err));
	}
}

function* confirmWrapper(payload) {
	console.log(payload);
	const promise = yield new Promise((resolve, reject) => {
		axios
			.post("http://localhost:3000/api/user/confirm", payload.confirm_credential, {
				withCredentials: true,
				headers: {
					"Content-Type": "text/plain",
					"Accept": "application/json",
					"Authorization": `Bearer ${payload.confirm_token}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					window.location.replace(`/login`);
				}
				const data = res.data;
				resolve(data);
			})
			.catch((err) => {
				reject(err.response.data);
			});
	});
	return promise;
}
