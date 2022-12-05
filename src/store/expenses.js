import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  quantity: 0,
  premiumIsActive: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addAmount(state, action) {
      const quant = action.payload;
      state.quantity = state.quantity + quant;
    },
    deleteAmount(state, action) {
      const quant = action.payload;
      state.quantity = state.quantity - quant;
    },
    replaceAmount(state, action) {
      state.quantity = action.payload;
      if (state.quantity >= 10000) {
        state.premiumIsActive = !state.premiumIsActive;
        console.log(state.premiumIsActive);
      } else {
        state.premiumIsActive = state.premiumIsActive;
        console.log(state.premiumIsActive);
      }
    },
    replaceExpenses(state, action) {
      state.expenses = action.payload;
      },
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;
