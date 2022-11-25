import React from "react";
import { useReducer } from "react";

const initialState = {
  expenses: [],
  addExpense: (expense) => {},
};

const ExpenseContext = React.createContext(initialState);

const ExpenseReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      ...state,
      expenses: [action.expense, ...state.expenses],
    };
  }
  return initialState;
};

export const ExpenseContextProvider = (props) => {
  const [expenseState, dispatchexpenseAction] = useReducer(
    ExpenseReducer,
    initialState
  );
  const addExpenseHandler = (expense) => {
    dispatchexpenseAction({ type: "ADD", expense: expense });
  };

  const context = {
    expenses: expenseState.expenses,
    addExpense: addExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={context}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
