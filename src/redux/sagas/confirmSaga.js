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
  const { confirm } = payload;
  const promise = yield new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3000/api/user/re-confirm", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${confirm.confirm_token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        //User Profile Not Found
        reject(err.response.data);
      });
  });
  return promise;
}

function* confirmWrapper(payload) {
  //TODO confirme user typini ekle ona gore navigate et
  console.log(payload);
  const { confirm, navigateTo } = payload;
  const promise = yield new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:3000/api/user/confirm",
        { confirm_credential: confirm.confirm_credential },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${confirm.confirm_token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          navigateTo("/login");
        }
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        //User Profile Not Found
        if (err.response.data.message === "User Profile Not Found") {
          navigateTo(`/signup?user=${confirm.user}`);
        }
        //Not authorized, no valid token
        else if (
          err.response.data.message === "Not authorized, no valid token"
        ) {
          navigateTo(`/signup?user=${confirm.user}`);
        }
        reject(err.response.data);
      });
  });
  return promise;
}
