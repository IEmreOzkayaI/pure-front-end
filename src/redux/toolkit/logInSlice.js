import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	logInInfo: null,
	logInError: false,
	logInProgress: false,
	logInFetch: null,
};

const reducers = {
	logInProgress: (state) => {
		state.logInInfo = null;
		state.logInError = false;
		state.logInProgress = true;
		state.logInFetch = null;
	},
	logInSuccess: (state, action) => {
		state.logInInfo = action.payload;
		state.logInError = false;
		state.logInFetch = null;
		state.logInProgress = false;
	},
	logInFailure: (state, action) => {
		state.logInError = action.payload;
		state.logInInfo = null;
		state.logInProgress = false;
		state.logInFetch = null;
	},
	clearLogInInfo: (state) => {
		state.logInInfo = null;
		state.logInError = false;
		state.logInFetch = null;
		state.logInProgress = false;
	},
	logInFetch: (state, action) => {
		state.logInFetch = action.payload;
		state.logInInfo = null;
		state.logInError = false;
		state.logInProgress = false;
	},
};

const logInSlice = createSlice({
	name: "logIn",
	initialState,
	reducers,
});

export const {logInProgress, logInFailure, logInSuccess, clearLogInInfo, logInFetch} = logInSlice.actions;
export default logInSlice.reducer;
