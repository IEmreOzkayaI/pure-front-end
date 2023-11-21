import { all, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  logInProgress,
  logInSuccess,
  logInFailure,
} from "../toolkit/logInSlice";

export default function* logInSaga() {
  yield all([logInWatcher()]);
}
function* logInWatcher() {
  yield takeLatest("logIn/logInFetch", logIn);
}

function* logIn(action) {
  try {
    yield put(logInProgress());
    const logInResponse = yield call(logInWrapper, action.payload);
    yield put(logInSuccess(logInResponse));
  } catch (err) {
    yield put(logInFailure(err));
  }
}

function* logInWrapper(payload) {
  const { logInForm, navigateTo } = payload;
  const promise = yield new Promise((resolve, reject) => {
    axios
      .post("http://localhost:3000/api/user/log-in", logInForm, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res);
          const access_token = res.data.access_token;
          const currentUser = getCurrentUser(access_token);
          console.log("currentUser", currentUser);
        }
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "User is not active")
          alert("Please Confirm your email first");

        reject(err.response.data);
      });
  });
  return promise;
}

//http://localhost:3000/api/user/current to get current user
function getCurrentUser(access_token) {
  axios
    .get("http://localhost:3000/api/user/current", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
