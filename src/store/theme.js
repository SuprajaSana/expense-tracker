import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.theme = !state.theme;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
