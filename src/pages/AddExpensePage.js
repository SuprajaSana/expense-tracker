import { useContext, useState } from "react";

import AuthContext from "../store/auth-context";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";

const AddExpense = () => {
  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  async function addHandler(NewMovieObj) {
    const response = await fetch(
      "https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses.json",
      {
        method: "POST",
        body: JSON.stringify(NewMovieObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <ExpenseForm onAdd={addHandler}></ExpenseForm>
    </div>
  );
};

export default AddExpense;
