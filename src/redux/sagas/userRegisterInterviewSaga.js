import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import { userRegisterInterviewFailure, userRegisterInterviewProgress, userRegisterInterviewSuccess } from "../toolkit/userRegisterInterviewSlice";

export default function* userRegisterInterviewSaga() {
	yield all([userRegisterInterviewWatcher()]);
}
function* userRegisterInterviewWatcher() {
	yield takeLatest("userRegisterInterview/userRegisterInterviewInit", userRegisterInterview);
}

function* userRegisterInterview(action) {
	try {
		yield put(userRegisterInterviewProgress());
		const registerResponse = yield call(userRegisterInterviewWrapper, action.payload);
		yield put(userRegisterInterviewSuccess(registerResponse));
	} catch (err) {
		yield put(userRegisterInterviewFailure(err));
	}
}

function* userRegisterInterviewWrapper(payload) {
  console.log(payload, "payload.formData")
	return yield new Promise((resolve, reject) => {
		axios
			.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/register_user_to_interview/${payload.interview_id}`,
				payload.formData, {
					withCredentials: true,
					headers: {
					'Content-Type': 'multipart/form-data'
					}
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
