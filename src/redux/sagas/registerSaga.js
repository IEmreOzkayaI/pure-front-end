import {all, put, call, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {registerProgress, registerSuccess, registerFailure} from "../toolkit/registerSlice";

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
	const promise = yield new Promise((resolve, reject) => {
		axios
			.post("https://the-pure-backend.cyclic.app/api/user/register", payload, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status === 201) {
					const confirm_url_token = res.data.confirm_url_token;
					window.location.replace(`confirm/${confirm_url_token}`);
				}
				const data = res.data;
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});

	return promise;
}

// if (document.cookie.indexOf("confirm_token") === -1) {
//   // cookie yok setle
//   var cookieName = "confirm_token";
//   var cookieValue = res.data.confirm_token;
//   var expiryHours = 1;
//   var date = new Date();
//   date.setTime(date.getTime() + expiryHours * 60 * 60 * 1000);

//   var secureFlag = location.protocol === "https:" ? "; secure" : ""; // Güvenli bağlantıda mı kontrolü

//   // Çerez oluşturma
//   document.cookie =
//     cookieName +
//     "=" +
//     cookieValue +
//     "; expires=" +
//     date.toUTCString() +
//     "; path=/" +
//     secureFlag +
//     ";";
// }
