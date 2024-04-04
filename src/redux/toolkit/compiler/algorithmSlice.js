import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    algorithmInfo: null,
    algorithmError: false,
    algorithmProgress: false,
    algorithmInit: null,
};

const reducers = {
    algorithmProgress: (state) => {
        console.log("algorithmProgress")
        state.algorithmInfo = null;
        state.algorithmError = false;
        state.algorithmProgress = true;
        state.algorithmInit = null;
    },
    algorithmSuccess: (state, action) => {
        console.log("algorithmSuccess",action.payload)
        state.algorithmInfo = action.payload;
        state.algorithmError = false;
        state.algorithmInit = null;
        state.algorithmProgress = false;
    },
    algorithmFailure: (state, action) => {
        console.log("algorithmFailure")
        state.algorithmError = action.payload;
        state.algorithmInfo = null;
        state.algorithmProgress = false;
        state.algorithmInit = null;
    },
    clearAlgorithmInfo: (state) => {
        state.algorithmInfo = null;
        state.algorithmError = false;
        state.algorithmInit = null;
        state.algorithmProgress = false;
    },
    algorithmFetch: (state, action) => {
        state.algorithmInit = action.payload;
        state.algorithmInfo = null;
        state.algorithmError = false;
        state.algorithmProgress = false;
    },
};

const algorithmSlice = createSlice({
    name: "algorithm",
    initialState,
    reducers,
});

export const {
    algorithmProgress,
    algorithmFailure,
    algorithmSuccess,
    clearAlgorithmInfo,
    algorithmFetch
} = algorithmSlice.actions;
export default algorithmSlice.reducer;
