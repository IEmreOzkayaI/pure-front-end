import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    logOutInfo: null,
    logOutError: false,
    logOutProgress: false,
    logOutInit: null,
};

const reducers = {
    logOutProgress: (state) => {
        state.logOutInfo = null;
        state.logOutError = false;
        state.logOutProgress = true;
        state.logOutInit = null;
    },
    logOutSuccess: (state, action) => {
        state.logOutInfo = action.payload;
        state.logOutError = false;
        state.logOutInit = null;
        state.logOutProgress = false;
    },
    logOutFailure: (state, action) => {
        state.logOutError = action.payload;
        state.logOutInfo = null;
        state.logOutProgress = false;
        state.logOutInit = null;
    },
    clearLogOutInfo: (state) => {
        state.logOutInfo = null;
        state.logOutError = false;
        state.logOutInit = null;
        state.logOutProgress = false;
    },
    logOutFetch: (state, action) => {
        state.logOutInit = action.payload;
        state.logOutInfo = null;
        state.logOutError = false;
        state.logOutProgress = false;
    },
};

const logOutSlice = createSlice({
    name: "logOut",
    initialState,
    reducers,
});

export const {logOutProgress, logOutFailure, logOutSuccess, clearLogOutInfo, logOutFetch} = logOutSlice.actions;
export default logOutSlice.reducer;