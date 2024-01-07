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
import authorization from "./toolkit/authorizationSlice";
import authorizationSaga from "./sagas/authorizationSaga";

import interview from "./toolkit/interviewSlice";
import interviewManagement from "./toolkit/interviewManagementSlice";

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {logIn, confirm, register, user, authorization, interview, interviewManagement},
    middleware: [saga],
});
saga.run(logInSaga);
saga.run(confirmSaga);
saga.run(registerSaga);
saga.run(userSaga);
saga.run(authorizationSaga);

export default store;
