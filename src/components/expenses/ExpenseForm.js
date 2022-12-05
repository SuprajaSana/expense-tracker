import { useRef, useContext, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import ExpenseContext from "../../store/expense-context";
import ExpenseList from "./ExpenseList";
import classes from "./ExpenseForm.module.css";
import { expensesActions } from "../../store/expenses";
import TotalExpenses from "./TotalExpenses";
import { authActions } from "../../store/auth";
import { themeActions } from "../../store/theme";

const ExpenseForm = (props) => {
  const email = useSelector((state) => state.auth.email);
  const showExpenses = useSelector((state) => state.auth.expensesIsVisible);
  const activePremium = useSelector(state => state.expenses.premium);
  const changeTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

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
  //const [showExpenses, setShowExpenses] = useState(false);

  const email1 = email.replace("@", "");
  const newEmail = email1.replace(".", "");

  function submitHandler(event) {
    event.preventDefault();
    if (!update) {
      const expense = {
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
        amount: +amountRef.current.value,
      };
      props.onAdd(expense);
      dispatch(expensesActions.addAmount(expense.amount));
    } else {
      const expense = {
        description: newdescription,
        category: newcategory,
        amount: +newamount,
      };
      props.onAdd(expense);
      dispatch(expensesActions.addAmount(expense.amount));
    }
  }

  async function editHandler(id) {
    setEdit(true);
    setId(id);
    const response = await fetch(
      `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses${newEmail}/${id}.json`
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
      `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses${newEmail}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch(expensesActions.deleteAmount(data.amount));
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

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchExpenseHandler = useCallback(async () => {
    setError(null);
    dispatch(authActions.toggle());
    try {
      const response = await fetch(
        `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses${newEmail}.json`
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
      setData(transformedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const themeChangeHandler = () => {
    dispatch(themeActions.toggle());
  };

  return (
    <div className={!changeTheme ? classes.auth : classes.darkmode}>
      <div className={classes.theme}>
        {!changeTheme && (
          <button className={classes.dark} onClick={themeChangeHandler}>
            Dark Theme
          </button>
        )}
        {changeTheme && (
          <button onClick={themeChangeHandler}>Light Theme</button>
        )}
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <h2>Expenses</h2>
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
      <div className={classes.actions}>
        <button onClick={fetchExpenseHandler}>Expenses</button>
      </div>
      {showExpenses && (
          <div>
            <div>
              <TotalExpenses></TotalExpenses>
            </div>
            <div className={classes.expenselist}>
              <ExpenseList onClick={editHandler}></ExpenseList>
            </div>
          </div>
      )}
    </div>
  );
};

export default ExpenseForm;
