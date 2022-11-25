import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";

import { useState } from "react";

const AddExpense = () => {
  /*const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (expense) => {
    setExpenses(expense);
    console.log(expense);
  };

  console.log(expenses); */

  return (
    <div>
      <ExpenseForm></ExpenseForm>
      <ExpenseList></ExpenseList>
    </div>
  );
};

export default AddExpense;
