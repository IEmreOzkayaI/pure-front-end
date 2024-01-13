import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logIn from "./toolkit/logInSlice";
import logInSaga from "./sagas/logInSaga";
import confirmSaga from "./sagas/confirmSaga";
import confirm from "./toolkit/confirmSlice";
import register from "./toolkit/registerSlice";
import registerSaga from "./sagas/registerSaga";
import user from "./toolkit/userSlice";
import userSaga from "./sagas/userSaga";

import interview from "./toolkit/interviewSlice";
import interviewManagement from "./toolkit/interviewManagementSlice";
import algorithmSaga from "./sagas/compiler/algorithmSaga.js";
import algorithmSlice from "./toolkit/compiler/algorithmSlice.js";

import logOutSaga from "./sagas/logOutSaga.js";
import logOutSlice from "./toolkit/logOutSlice.js";
import interviewSlice from "./toolkit/interviewSlice.js";
import interviewSaga from "./sagas/interviewSaga.js";

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {logIn, confirm, register, user, interview, interviewManagement , algorithmSlice , logOutSlice , interviewSlice},
    middleware: [saga],
});
saga.run(logInSaga);
saga.run(confirmSaga);
saga.run(registerSaga);
saga.run(userSaga);
saga.run(algorithmSaga)
saga.run(logOutSaga)
saga.run(interviewSaga)

export default store;
