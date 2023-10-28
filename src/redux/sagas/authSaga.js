import { all, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { authProgress, authSuccess, authFailure } from "../toolkit/authSlice";

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
        "https://pure-backend-node-production.up.railway.app/api/user/register",
        payload,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
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
        // if (res.status === 201) {
        //   window.location.href = "/confirm";
        // }
        console.log("res", res);
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });

  return promise;
}
