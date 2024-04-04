import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagramInfo: null,
  diagramError: false,
  diagramProgress: false,
  diagramInit: null,
  diagramEdges: null,
  diagramNodes: null,
};

const reducers = {
  diagramProgress: (state) => {
    state.diagramInfo = null;
    state.diagramError = false;
    state.diagramProgress = true;
    state.diagramInit = null;
  },
  diagramSuccess: (state, action) => {
    state.diagramInfo = action.payload;
    state.diagramError = false;
    state.diagramInit = null;
    state.diagramProgress = false;
  },
  diagramFailure: (state, action) => {
    state.diagramError = action.payload;
    state.diagramInfo = null;
    state.diagramProgress = false;
    state.diagramInit = null;
  },
  clearDiagramInfo: (state) => {
    state.diagramInfo = null;
    state.diagramError = false;
    state.diagramInit = null;
    state.diagramProgress = false;
    state.diagramEdges = null;
    state.diagramNodes = null;
  },
  getEdgesAndNodes: (state, action) => {
    state.diagramInit = action.payload;
    state.diagramInfo = null;
    state.diagramError = false;
    state.diagramProgress = false;
  },
  updateEdges: (state, action) => {
    console.log("updateEdges", action.payload)
    state.diagramEdges = action.payload;
  },
  updateNodes: (state, action) => {
    state.diagramNodes = action.payload;
  },
};

const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers,
});

export const {
  diagramProgress,
  diagramFailure,
  diagramSuccess,
  clearDiagramInfo,
  getEdgesAndNodes,
  updateEdges,
  updateNodes,
} = diagramSlice.actions;
export default diagramSlice.reducer;
