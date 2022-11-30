import React, { useState } from "react";

import classes from "./Expense.module.css";

const Expense = (props) => {
  const [isEdit, setEdit] = useState(false);

  function deleteExpenseHandler(id) {
    const response = fetch(
      `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Expense successfully deleted");
    }
  }

  const edit = (id) => {
    props.onClick(id);
  };

  return (
    <li className={classes.expenses}>
      <span className={classes.description}>{props.description}</span>
      <span className={classes.category}>{props.category}</span>
      <span className={classes.price}>$ {props.amount}</span>
      <div className={classes.buttons}>
        <button onClick={(e) => deleteExpenseHandler(props.id, e)}>
          DELETE
        </button>
        <button onClick={(e) => edit(props.id, e)}>EDIT</button>
      </div>
    </li>
  );
};

export default Expense;
