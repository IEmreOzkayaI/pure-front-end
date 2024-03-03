import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import { userLogInInterviewFailure, userLogInInterviewProgress, userLogInInterviewSuccess } from "../toolkit/userLogInInterviewSlice";

export default function* userLogInInterviewSaga() {
	yield all([userLogInInterviewWatcher()]);
}
function* userLogInInterviewWatcher() {
	yield takeLatest("userLogInInterview/userLogInInterviewInit", userLogInInterview);
}

function* userLogInInterview(action) {
	try {
		yield put(userLogInInterviewProgress());
		const LogInResponse = yield call(userLogInInterviewWrapper, action.payload);
		yield put(userLogInInterviewSuccess(LogInResponse));
	} catch (err) {
		yield put(userLogInInterviewFailure(err));
	}
}

function* userLogInInterviewWrapper(payload) {
  console.log(payload, "payload.formData")
	return yield new Promise((resolve, reject) => {
		axios
			.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/login_user_to_interview/${payload.interview_signature}`,
				payload.logInData, {
					withCredentials: true,
				})
			.then((res) => {
				const data = res.data.message;
				resolve(data);
			})
			.catch((err) => {
				reject(err.response.data.message);
			});
	});
}
