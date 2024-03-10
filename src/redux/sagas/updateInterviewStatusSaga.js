import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {updateInterviewStatusFailure, updateInterviewStatusProgress, updateInterviewStatusSuccess} from "../toolkit/updateInterviewStatusSlice";

export default function* updateInterviewStatusSaga() {
	yield all([updateInterviewStatusWatcher()]);
}
function* updateInterviewStatusWatcher() {
	yield takeLatest("updateInterviewStatusSlice/updateInterviewStatusFetch", updateInterviewStatus);
}

function* updateInterviewStatus(action) {
	try {
		yield put(updateInterviewStatusProgress());
		const updateInterviewStatusResponse = yield call(updateInterviewStatusWrapper, action.payload);
		yield put(updateInterviewStatusSuccess(updateInterviewStatusResponse));
	} catch (err) {
		yield put(updateInterviewStatusFailure(err));
	}
}

function* updateInterviewStatusWrapper(payload) {
	return yield new Promise((resolve, reject) => {
		axios
			.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/interview/update_result_status`, payload, {
				withCredentials: true,
			})
			.then((res) => {
				const data = res.data;
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
