import { createSlice } from "@reduxjs/toolkit";

//const initToken = localStorage.getItem('token')
const initEmail = localStorage.getItem("email");

const initialAuthState = {
  isAuthenticated: true,
  email: initEmail,
  expensesIsVisible: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      //state.token = action.payload;
      state.email = action.payload;
      //localStorage.setItem("token", state.token);
      localStorage.setItem("email", state.email);
    },
    logout(state) {
      state.isAuthenticated = null;
      state.token = null;
      localStorage.removeItem("email");
    },
    toggle(state) {
      state.expensesIsVisible = !state.expensesIsVisible;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
