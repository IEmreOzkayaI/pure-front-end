import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    questions: null,
    questionsResults: null,
    currentQuestion: null,
    remainingTime: null,
    interviewStatus: null,
}

const reducers = {
    setQuestions: (state, action) => {
        state.questions = action.payload;
    },
    setQuestionsResults: (state, action) => {
        state.questionsResults = action.payload;
    },
    setCurrentQuestion: (state, action) => {
        console.log(action.payload)
        state.currentQuestion = action.payload;
    },
    setRemainingTime: (state, action) => {
        state.remainingTime = action.payload;
    },
    setInterviewStatus: (state, action) => {
        state.interviewStatus = action.payload;
    },
    clearInterview: (state) => {
        state.questions = null;
        state.questionsResults = null;
        state.selectedQuestions = null;
        state.remainingTime = null;
        state.interviewStatus = null;
    },
}

const interviewManagementSlice = createSlice({
    name: "interviewManagement",
    initialState,
    reducers,
});

export const {setQuestions, setQuestionsResults, setCurrentQuestion, setRemainingTime, setInterviewStatus, clearInterview} = interviewManagementSlice.actions;
export default interviewManagementSlice.reducer;