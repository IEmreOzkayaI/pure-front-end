import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import auth from "./toolkit/authSlice";
import authSaga from "./sagas/authSaga";
import confirmSaga from "./sagas/confirmSaga";
import confirm from "./toolkit/confirmSlice";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: { auth, confirm },
  middleware: [saga],
});
saga.run(authSaga);
saga.run(confirmSaga);
export default store;
