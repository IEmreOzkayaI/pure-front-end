import { all, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  confirmProgress,
  confirmSuccess,
  confirmFailure,
} from "../toolkit/confirmSlice";

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
  //TODO confirme user typini ekle ona gore navigate et
  console.log(payload);
  const { confirm, navigateTo } = payload;
  const promise = yield new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:3000/api/user/confirm",
        confirm.confirm_credential,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "text/plain",
            Accept: "application/json",
            Authorization: `Bearer ${confirm.confirm_token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          navigateTo("/confirm-oldu");
        }
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        //User Profile Not Found
        if (err.response.data.message === "User Profile Not Found") {
          navigateTo("/signup?user=user");
        }
        //Not authorized, no valid token
        else if (
          err.response.data.message === "Not authorized, no valid token"
        ) {
          navigateTo("/signup?user=user");
        }
        reject(err.response.data);
      });
  });
  return promise;
}
