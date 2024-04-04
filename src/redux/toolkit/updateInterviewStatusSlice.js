import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	updateInterviewStatusInfo: null,
	updateInterviewStatusError: false,
	updateInterviewStatusProgress: false,
	updateInterviewStatusInit: null,
};

const reducers = {
	updateInterviewStatusProgress: (state) => {
		state.updateInterviewStatusInfo = null;
		state.updateInterviewStatusError = false;
		state.updateInterviewStatusProgress = true;
		state.updateInterviewStatusInit = false;
	},
	updateInterviewStatusSuccess: (state, action) => {
		state.updateInterviewStatusInfo = action.payload;
		state.updateInterviewStatusError = false;
		state.updateInterviewStatusInit = false;
		state.updateInterviewStatusProgress = false;
	},
	updateInterviewStatusFailure: (state, action) => {
		state.updateInterviewStatusError = action.payload;
		state.updateInterviewStatusInfo = null;
		state.updateInterviewStatusProgress = false;
		state.updateInterviewStatusInit = false;
	},
	clearUpdateInterviewStatusInfo: (state) => {
		state.updateInterviewStatusInfo = null;
		state.updateInterviewStatusError = false;
		state.updateInterviewStatusInit = false;
		state.updateInterviewStatusProgress = false;
	},
	updateInterviewStatusFetch: (state, action) => {
		state.updateInterviewStatusInit = action.payload;
		state.updateInterviewStatusInfo = null;
		state.updateInterviewStatusError = false;
		state.updateInterviewStatusProgress = false;
	},
};

const updateInterviewStatusSlice = createSlice({
	name: "updateInterviewStatusSlice",
	initialState,
	reducers,
});

export const {updateInterviewStatusProgress, updateInterviewStatusFailure, updateInterviewStatusSuccess, clearUpdateInterviewStatusInfo, updateInterviewStatusFetch} = updateInterviewStatusSlice.actions;
export default updateInterviewStatusSlice.reducer;
