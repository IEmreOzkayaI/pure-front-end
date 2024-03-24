import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	addQuestionInfo: null,
	addQuestionError: false,
	addQuestionProgress: false,
	addQuestionInit: null,
};

const reducers = {
	addQuestionProgress: (state) => {
		state.addQuestionInfo = null;
		state.addQuestionError = false;
		state.addQuestionProgress = true;
		state.addQuestionInit = null;
	},
	addQuestionSuccess: (state, action) => {
		state.addQuestionInfo = action.payload;
		state.addQuestionError = false;
		state.addQuestionInit = null;
		state.addQuestionProgress = false;
	},
	addQuestionFailure: (state, action) => {
		state.addQuestionError = action.payload;
		state.addQuestionInfo = null;
		state.addQuestionProgress = false;
		state.addQuestionInit = null;
	},
	clearAddQuestionInfo: (state) => {
		state.addQuestionInfo = null;
		state.addQuestionError = false;
		state.addQuestionInit = null;
		state.addQuestionProgress = false;
	},
	addQuestionFetch: (state, action) => {
		state.addQuestionInit = action.payload;
		state.addQuestionInfo = null;
		state.addQuestionError = false;
		state.addQuestionProgress = false;
	},
};

const addQuestionSlice = createSlice({
	name: "addQuestion",
	initialState,
	reducers,
});

export const {addQuestionProgress, addQuestionFailure, addQuestionSuccess, clearAddQuestionInfo, addQuestionFetch} = addQuestionSlice.actions;
export default addQuestionSlice.reducer;
