import { useRef ,useContext} from "react";
import ExpenseContext from "../../store/expense-context";

import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const descriptionRef = useRef("");
  const categoryRef = useRef("");
  const amountRef = useRef("");

const expenseCtx=useContext(ExpenseContext)


  function submitHandler(event) {
    event.preventDefault();

    const expense = {
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
    };
    expenseCtx.addExpense(expense);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.auth}>
        <h2>Daily Expenses</h2>
        <div className={classes.control}>
          <input
            type="text"
            id="description"
            placeholder="Description"
            ref={descriptionRef}
          />
        </div>
        <div className={classes.control}>
          <input
            type="text"
            id="category"
            placeholder="Category"
            ref={categoryRef}
          ></input>
        </div>
        <div className={classes.control}>
          <input
            type="number"
            id="amount"
            placeholder="Amount"
            ref={amountRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Add Movies</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
