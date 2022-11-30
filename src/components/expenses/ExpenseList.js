import React, { useContext, useState } from "react";
import { useCallback, useEffect } from "react";
import AuthContext from "../../store/auth-context";

import ExpenseContext from "../../store/expense-context";
import Expense from "./Expense";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  //const expenseCtx=useContext(ExpenseContext)

  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }

      const data = await response.json();

      const transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          description: data[key].description,
          category: data[key].category,
          amount: data[key].amount,
        });
      }

      setExpenses(transformedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  const editlist = (id) => {
    props.onClick(id);
  };

  return (
    <ul className={classes["expenses-list"]}>
      {expenses.map((expense) => (
        <Expense
          key={expense.id}
          id={expense.id}
          description={expense.description}
          category={expense.category}
          amount={expense.amount}
          onClick={(e) => editlist(expense.id, e)}
        ></Expense>
      ))}
    </ul>
  );
};
export default ExpenseList;
