import {all, put, call, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {confirmProgress, confirmSuccess, confirmFailure} from "../toolkit/confirmSlice";

export default function* confirmSaga() {
	yield all([confirmWatcher(), reconfirmWatcher()]);
}
function* confirmWatcher() {
	yield takeLatest("confirm/confirmFetch", confirm);
}

function* reconfirmWatcher() {
	yield takeLatest("confirm/reConfirmFetch", reconfirm);
}

function* confirm(action) {
	try {
		yield put(confirmProgress());
		const confirmResponse = yield call(confirmWrapper, action.payload);
		yield put(confirmSuccess(confirmResponse));
	} catch (err) {
		console.log(err);
		yield put(confirmFailure(err));
	}
}
function* reconfirm(action) {
	try {
		// yield put(confirmProgress());
		const reconfirmResponse = yield call(reConfirmWrapper, action.payload);
		// yield put(confirmSuccess(reconfirmResponse));
	} catch (err) {
		// yield put(confirmFailure(err));
	}
}

function* reConfirmWrapper(payload) {
	//make a get request to http://localhost:3000/api/user/re-confirm
	console.log("reconfirm", payload);
	const promise = yield new Promise((resolve, reject) => {
		axios
			.get("http://localhost:3000/api/user/re-confirm", {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((res) => {
				const data = res.data;
				resolve(data);
			})
			.catch((err) => {
				console.log(err);
				reject(err.response.data);
			});
	});
	return promise;
}

function* confirmWrapper(payload) {
	const {confirm_credential} = payload;
	const promise = yield new Promise((resolve, reject) => {
		axios
			.post(
				"http://localhost:3000/api/user/confirm",
				{confirm_credential},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			)
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
