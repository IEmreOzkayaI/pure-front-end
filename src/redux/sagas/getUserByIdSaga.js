import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  userByIdFailure,
  userByIdProgress,
  userByIdSuccess,
} from "../toolkit/getUserByIdSlice";

export default function* getUserByIdSaga() {
  yield all([userByIdWatcher()]);
}

function* userByIdWatcher() {
  yield takeLatest("userById/userByIdFetch", userById);
}

function* userById(action) {
  try {
    yield put(userByIdProgress());
    const userByIdResponse = yield call(userByIdWrapper, action.payload);
    yield put(userByIdSuccess(userByIdResponse));
  } catch (err) {
    yield put(userByIdFailure(err));
  }
}

function* userByIdWrapper(individual_user_id) {
  return yield new Promise((resolve, reject) => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }api/user/individual_user/${individual_user_id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          resolve(data);
        }
      })
      .catch((err) => {
        // if (err.response.status === 401)
        //     window.location.href = "/login";
        reject(err.response.data);
      });
  });
}
