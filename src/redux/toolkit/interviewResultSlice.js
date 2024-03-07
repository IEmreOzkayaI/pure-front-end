import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    interviewResultInfo: null,
    interviewResultError: false,
    interviewResultProgress: false,
    interviewResultInit: null,
};

const reducers = {
    interviewResultProgress: (state) => {
        state.interviewResultInfo = null;
        state.interviewResultError = false;
        state.interviewResultProgress = true;
        state.interviewResultInit = false;
    },
    interviewResultSuccess: (state, action) => {
        state.interviewResultInfo = action.payload;
        state.interviewResultError = false;
        state.interviewResultInit = false;
        state.interviewResultProgress = false;
    },
    interviewResultFailure: (state, action) => {
        state.interviewResultError = action.payload;
        state.interviewResultInfo = null;
        state.interviewResultProgress = false;
        state.interviewResultInit = false;
    },
    clearInterviewResultInfo: (state) => {
        state.interviewResultInfo = null;
        state.interviewResultError = false;
        state.interviewResultInit = false;
        state.interviewResultProgress = false;
    },
    interviewResultFetch: (state, action) => {
        state.interviewResultInit = action.payload;
        state.interviewResultInfo = null;
        state.interviewResultError = false;
        state.interviewResultProgress = false;
    },
}

const interviewResultSlice = createSlice({
    name: "interviewResult",
    initialState,
    reducers,
});

export const {interviewResultProgress, interviewResultFailure, interviewResultSuccess, clearInterviewResultInfo, interviewResultFetch} = interviewResultSlice.actions;
export default interviewResultSlice.reducer;