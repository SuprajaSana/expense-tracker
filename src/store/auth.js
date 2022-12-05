import { createSlice } from "@reduxjs/toolkit";

const initToken = localStorage.getItem('token')
const initEmail = localStorage.getItem("email");

const initialAuthState = {
  isAuthenticated: true,
  email: initEmail,
  token: initToken,
  expensesIsVisible: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload;
      localStorage.setItem("email", state.email);
      console.log(state.email);
    },
    loginToken(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("token", state.token);
      console.log(state.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
    toggle(state) {
      state.expensesIsVisible = !state.expensesIsVisible;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
