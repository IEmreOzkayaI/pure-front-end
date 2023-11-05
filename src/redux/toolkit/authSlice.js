import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	authInfo: null,
	authError: false,
	authProgress: false,
	authFetch: null,
};

const reducers = {
	authProgress: (state) => {
		state.authInfo = null;
		state.authError = false;
		state.authProgress = true;
		state.authFetch = null;
	},
	authSuccess: (state, action) => {
		state.authInfo = action.payload;
		state.authError = false;
		state.authFetch = null;
		state.authProgress = false;
	},
	authFailure: (state, action) => {
		state.authError = action.payload;
		state.authInfo = null;
		state.authProgress = false;
		state.authFetch = null;
	},
	clearAuthInfo: (state) => {
		state.authInfo = null;
		state.authError = false;
		state.authFetch = null;
		state.authProgress = false;
	},
	authFetch: (state, action) => {
		state.authFetch = action.payload;
		state.authInfo = null;
		state.authError = false;
		state.authProgress = false;
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers,
});

export const {authProgress, authFailure, authSuccess, clearAuthInfo, authFetch} = authSlice.actions;
export default authSlice.reducer;
