import {all, call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {addQuestionFailure, addQuestionProgress, addQuestionSuccess} from "../toolkit/addQuestionSlice";

export default function* addQuestionSaga() {
	yield all([addQuestionWatcher()]);
}

function* addQuestionWatcher() {
	yield takeLatest("addQuestion/addQuestionFetch", addQuestion);
}

function* addQuestion(action) {
	try {
		yield put(addQuestionProgress());
		const addQuestionResponse = yield call(addQuestionWrapper, action.payload);
		yield put(addQuestionSuccess(addQuestionResponse));
	} catch (err) {
		console.log(err);
		yield put(addQuestionFailure(err));
	}
}

function* addQuestionWrapper(payload) {
	return yield new Promise((resolve, reject) => {
		axios
			.post(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/api/question/create_ai`,
				payload,
				{
					withCredentials: true,
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
}
