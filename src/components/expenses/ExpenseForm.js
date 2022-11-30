import { useRef, useContext, useState } from "react";
import ExpenseContext from "../../store/expense-context";
import ExpenseList from "./ExpenseList";

import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const descriptionRef = useRef("");
  const categoryRef = useRef("");
  const amountRef = useRef("");

  const expenseCtx = useContext(ExpenseContext);

  const [edit, setEdit] = useState(false);
  const [expenses, setExpense] = useState([]);
  const [newdescription, setDescription] = useState();
  const [newcategory, setCategory] = useState();
  const [newamount, setAmount] = useState();
  const [id, setId] = useState();
  const [update, setUpdate] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    if (!update) {
      const expense = {
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
        amount: amountRef.current.value,
      };
      props.onAdd(expense);
    } else {
      const expense = {
        description: newdescription,
        category: newcategory,
        amount: newamount,
      };
      props.onAdd(expense);
    }
  }

  async function editHandler(id) {
    setEdit(true);
    setId(id);
    const response = await fetch(
      `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses/${id}.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong...retrying");
    }

    setUpdate(true);

    const data = await response.json();
    setExpense(data);
    setDescription(data.description);
    setCategory(data.category);
    setAmount(data.amount);

    const deleteExpense = await fetch(
      `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses/${id}.json`,
      {
        method: "DELETE",
      }
    );
  }

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className={classes.auth}>
      <form onSubmit={submitHandler}>
        <div>
          <h2>Daily Expenses</h2>
          {!edit && (
            <div className={classes.control}>
              <input
                type="text"
                id="description"
                placeholder="Description"
                ref={descriptionRef}
              />
            </div>
          )}
          {edit && (
            <div className={classes.control}>
              <input
                type="text"
                id="description"
                placeholder="Description"
                value={newdescription}
                onChange={descriptionHandler}
              />
            </div>
          )}
          {!edit && (
            <div className={classes.control}>
              <input
                type="text"
                id="category"
                placeholder="Category"
                ref={categoryRef}
              ></input>
            </div>
          )}
          {edit && (
            <div className={classes.control}>
              <input
                type="text"
                id="category"
                placeholder="Category"
                value={newcategory}
                onChange={categoryHandler}
              ></input>
            </div>
          )}
          {!edit && (
            <div className={classes.control}>
              <input
                type="number"
                id="amount"
                placeholder="Amount"
                ref={amountRef}
              />
            </div>
          )}
          {edit && (
            <div className={classes.control}>
              <input
                type="number"
                id="amount"
                placeholder="Amount"
                value={newamount}
                onChange={amountHandler}
              />
            </div>
          )}
          <div className={classes.actions}>
            <button>Add Expenses</button>
          </div>
        </div>
      </form>
      <div className={classes.expenselist}>
        <ExpenseList onClick={editHandler}></ExpenseList>
      </div>
    </div>
  );
};

export default ExpenseForm;
