import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    questionInfo: null,
    questionError: false,
    questionProgress: false,
    questionInit: null,
}

const reducers = {
    questionProgress: (state) => {
        state.questionInfo = null;
        state.questionError = false;
        state.questionProgress = true;
        state.questionInit = false;
    },
    questionSuccess: (state, action) => {
        state.questionInfo = action.payload;
        state.questionError = false;
        state.questionInit = false;
        state.questionProgress = false;
    },
    questionFailure: (state, action) => {
        state.questionError = action.payload;
        state.questionInfo = null;
        state.questionProgress = false;
        state.questionInit = false;
    },
    clearQuestionInfo: (state) => {
        state.questionInfo = null;
        state.questionError = false;
        state.questionInit = false;
        state.questionProgress = false;
    },
    filteredQuestionFetch: (state, action) => {
        state.questionInit = action.payload;
        state.questionInfo = null;
        state.questionError = false;
        state.questionProgress = false;
    },
}

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers,
});

export const {questionProgress, questionFailure, questionSuccess, clearQuestionInfo, filteredQuestionFetch} = questionSlice.actions;
export default questionSlice.reducer;