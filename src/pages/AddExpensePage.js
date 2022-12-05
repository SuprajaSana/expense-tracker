import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import AuthContext from "../store/auth-context";
import ExpenseForm from "../components/expenses/ExpenseForm";

const AddExpense = (props) => {
  const authCtx = useContext(AuthContext);

  const email = useSelector((state) => state.auth.email);

  //const token = authCtx.token;

  const email1 = email.replace("@", "");
  const newEmail = email1.replace(".", "");

  async function addHandler(NewExpenseObj) {
    const response = await fetch(
      `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/dailyexpenses${newEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(NewExpenseObj),
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
