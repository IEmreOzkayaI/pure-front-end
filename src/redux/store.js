import { configureStore } from "@reduxjs/toolkit";
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
import diagramSaga from "./sagas/diagramSaga.js";
import diagramSlice from "./toolkit/diagramSlice.js";

import questionSlice from "./toolkit/questionSlice.js";
import questionSaga from "./sagas/questionSaga.js";

import getQuestionSlice from "./toolkit/getQuestionSlice.js";
import getQuestionSaga from "./sagas/getQuestionSaga.js";

import addInterviewSaga from "./sagas/addInterviewSaga.js";
import addInterviewSlice from "./toolkit/addInterviewSlice.js";

import userRegisterInterview from "./toolkit/userRegisterInterviewSlice";
import userRegisterInterviewSaga from "./sagas/userRegisterInterviewSaga.js";

import userLogInInterview from "./toolkit/userLogInInterviewSlice";
import userLogInInterviewSaga from "./sagas/userLogInInterviewSaga.js";

import getInterviewByCompanyIdSlice from "./toolkit/getInterviewByCompanyIdSlice.js";
import getInterviewByCompanyIdSaga from "./sagas/getInterviewByCompanyIdSaga.js";

import intervieweeListSaga from "./sagas/intervieweeListSaga.js";
import intervieweeListSlice from "./toolkit/intervieweeListSlice.js";

import getUserByIdSlice from "./toolkit/getUserByIdSlice.js";
import getUserByIdSaga from "./sagas/getUserByIdSaga.js";

import interviewSignatured from "./toolkit/interviewSignaturedSlice.js";
import interviewSignaturedSaga from "./sagas/interviewSignaturedSaga.js";

import interviewSolveLinkSaga from "./sagas/sendInterviewSolveLinkSaga.js";
import interviewSolveLinkSlice from "./toolkit/interviewSolveLinkSlice.js";

import interviewResultSaga from "./sagas/interviewResultSaga";
import interviewResultSlice from "./toolkit/interviewResultSlice";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    logIn,
    confirm,
    register,
    user,
    interview,
    interviewManagement,
    algorithmSlice,
    logOutSlice,
    interviewSlice,
    diagramSlice,
    questionSlice,
    getQuestionSlice,
    addInterviewSlice,
    getInterviewByCompanyIdSlice,
    userRegisterInterview,
    userLogInInterview,
    intervieweeListSlice,
    getUserByIdSlice,
    interviewSignatured,
    interviewSolveLinkSlice,
    interviewResultSlice,
  },
  middleware: [saga],
});
saga.run(logInSaga);
saga.run(confirmSaga);
saga.run(registerSaga);
saga.run(userSaga);
saga.run(algorithmSaga);
saga.run(logOutSaga);
saga.run(interviewSaga);
saga.run(questionSaga);
saga.run(getQuestionSaga);
saga.run(addInterviewSaga);
saga.run(diagramSaga);
saga.run(userRegisterInterviewSaga);
saga.run(userLogInInterviewSaga);
saga.run(getInterviewByCompanyIdSaga);
saga.run(intervieweeListSaga);
saga.run(getUserByIdSaga);
saga.run(interviewSignaturedSaga);
saga.run(interviewSolveLinkSaga);
saga.run(interviewResultSaga);

export default store;
