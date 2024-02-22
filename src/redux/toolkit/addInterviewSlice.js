import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    addInterviewInfo: null,
    addInterviewError: false,
    addInterviewProgress: false,
    addInterviewInit: null,
};

const reducers = {
    addInterviewProgress: (state) => {
        state.addInterviewInfo = null;
        state.addInterviewError = false;
        state.addInterviewProgress = true;
        state.addInterviewInit = null;
    },
    addInterviewSuccess: (state, action) => {
        state.addInterviewInfo = action.payload;
        state.addInterviewError = false;
        state.addInterviewInit = null;
        state.addInterviewProgress = false;
    },
    addInterviewFailure: (state, action) => {
        state.addInterviewError = action.payload;
        state.addInterviewInfo = null;
        state.addInterviewProgress = false;
        state.addInterviewInit = null;
    },
    clearaddInterviewInfo: (state) => {
        state.addInterviewInfo = null;
        state.addInterviewError = false;
        state.addInterviewInit = null;
        state.addInterviewProgress = false;
    },
    addInterviewFetch: (state, action) => {
        state.addInterviewInit = action.payload;
        state.addInterviewInfo = null;
        state.addInterviewError = false;
        state.addInterviewProgress = false;
    },
}


const addInterviewSlice = createSlice({
    name: "addInterviewSlice",
    initialState,
    reducers,
});

export const {addInterviewProgress, addInterviewFailure, addInterviewSuccess, clearaddInterviewInfo, addInterviewFetch} = addInterviewSlice.actions;
export default addInterviewSlice.reducer;