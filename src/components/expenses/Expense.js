import { useSelector, useDispatch } from "react-redux";

import { expensesActions } from "../../store/expenses";
import classes from "./Expense.module.css";

const Expense = (props) => {
  const email = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();

  const newAmount = props.amount;

  const email1 = email.replace("@", "");
  const newEmail = email1.replace(".", "");

  function deleteExpenseHandler(id, newAmount) {
    const response = fetch(
      `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses${newEmail}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch(expensesActions.deleteAmount(newAmount));
  }

  const edit = (id) => {
    props.onClick(id);
  };

  return (
    <div>
      <li className={classes.expenses}>
        <span className={classes.description}>{props.description}</span>
        <span className={classes.category}>{props.category}</span>
        <span className={classes.price}>Rs. {props.amount}</span>
        <div className={classes.buttons}>
          <button onClick={(e) => deleteExpenseHandler(props.id, newAmount)}>
            DELETE
          </button>
          <button onClick={(e) => edit(props.id, e)}>EDIT</button>
        </div>
      </li>
    </div>
  );
};

export default Expense;
