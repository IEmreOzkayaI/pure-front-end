import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	registerInfo: null,
	registerError: false,
	registerProgress: false,
	registerFetch: null,
};

const reducers = {
	registerProgress: (state) => {
		state.registerInfo = null;
		state.registerError = false;
		state.registerProgress = true;
		// state.registerFetch = false;
	},
	registerSuccess: (state, action) => {
		state.registerInfo = action.payload;
		state.registerError = false;
		state.registerFetch = false;
		state.registerProgress = false;
	},
	registerFailure: (state, action) => {
		state.registerError = action.payload;
		state.registerInfo = null;
		state.registerProgress = false;
		state.registerFetch = false;
	},
	clearRegisterInfo: (state) => {
		state.registerInfo = null;
		state.registerError = false;
		state.registerFetch = false;
		state.registerProgress = false;
	},
	registerFetch: (state, action) => {
		state.registerFetch = action.payload;
		state.registerInfo = null;
		state.registerError = false;
		state.registerProgress = false;
	},
};

const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers,
});

export const {registerProgress, registerFailure, registerSuccess, clearAuthInfo, registerFetch} = registerSlice.actions;
export default registerSlice.reducer;
