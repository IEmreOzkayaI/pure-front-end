import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    interviewSignaturedInfo: null,
    interviewSignaturedError: false,
    interviewSignaturedProgress: false,
    interviewSignaturedInit: null,
};

const reducers = {
    interviewSignaturedProgress: (state) => {
        state.interviewSignaturedInfo = null;
        state.interviewSignaturedError = false;
        state.interviewSignaturedProgress = true;
        state.interviewSignaturedInit = false;
    },
    interviewSignaturedSuccess: (state, action) => {
        state.interviewSignaturedInfo = action.payload;
        state.interviewSignaturedError = false;
        state.interviewSignaturedInit = false;
        state.interviewSignaturedProgress = false;
    },
    interviewSignaturedFailure: (state, action) => {
        state.interviewSignaturedError = action.payload;
        state.interviewSignaturedInfo = null;
        state.interviewSignaturedProgress = false;
        state.interviewSignaturedInit = false;
    },
    clearinterviewSignaturedInfo: (state) => {
        state.interviewSignaturedInfo = null;
        state.interviewSignaturedError = false;
        state.interviewSignaturedInit = false;
        state.interviewSignaturedProgress = false;
    },
    interviewSignaturedFetch: (state, action) => {
        state.interviewSignaturedInit = action.payload;
        state.interviewSignaturedInfo = null;
        state.interviewSignaturedError = false;
        state.interviewSignaturedProgress = false;
    },
}

const interviewSignaturedSlice = createSlice({
    name: "interviewSignatured",
    initialState,
    reducers,
});

export const {interviewSignaturedProgress, interviewSignaturedFailure, interviewSignaturedSuccess, clearinterviewSignaturedInfo, interviewSignaturedFetch} = interviewSignaturedSlice.actions;
export default interviewSignaturedSlice.reducer;