import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {registerFailure, registerProgress, registerSuccess} from "../toolkit/registerSlice";

export default function* registerSaga() {
	yield all([registerWatcher()]);
}
function* registerWatcher() {
	yield takeLatest("register/registerFetch", register);
}

function* register(action) {
	try {
		yield put(registerProgress());
		const registerResponse = yield call(registerWrapper, action.payload);
		yield put(registerSuccess(registerResponse));
	} catch (err) {
		yield put(registerFailure(err));
	}
}

function* registerWrapper(payload) {
	const {Individual_User, Company_User} = payload;
	const user = Individual_User ? Individual_User : Company_User;

	return yield new Promise((resolve, reject) => {
		axios
			.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/register`,
				user, {
					withCredentials: true,
				})
			.then((res) => {
				const data = res.data;
				resolve(data);
			})
			.catch((err) => {
				if (err.response.data.message === "User Already Exists") ;
				reject(err);
			});
	});
}