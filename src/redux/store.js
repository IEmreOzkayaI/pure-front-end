import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import auth from "./toolkit/authSlice";
import authSaga from "./sagas/registerSaga";
import confirmSaga from "./sagas/confirmSaga";
import confirm from "./toolkit/confirmSlice";
import register from "./toolkit/registerSlice";
import registerSaga from "./sagas/registerSaga";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: { auth, confirm ,register},
  middleware: [saga],
});
saga.run(authSaga);
saga.run(confirmSaga);
saga.run(registerSaga);
export default store;
