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
        console.log("res", res);
        if (res.status === 200) {
          // localStorage.setItem("access_token", res.data.access_token);
          // navigateTo("/basarili-giris");
          const refreshTokenValue = getRefreshToken();
          console.log(refreshTokenValue)
          const userPromise =  getCurrentUser(refreshTokenValue)
          userPromise.then((user)=>{
            console.log('userPromise',userPromise)
            console.log('user',user)
          })
        }
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
  const promise =  new Promise((resolve, reject) => {
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

          // navigateTo("/basarili-giris");
        }
        const data = res.data;
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err.response.data);
      });
  });
  return promise;
}

function getRefreshToken() {
  const cookieString = document.cookie;
  const cookieArray = cookieString.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    
    // Check if the cookie starts with "refresh_token="
    if (cookie.startsWith('refresh_token=')) {
      // Extract the value of the refresh_token
      return cookie.substring('refresh_token='.length);
    }
  }

  // Return null if the refresh_token cookie is not found
  return null;
}