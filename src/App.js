import { Redirect, Route } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LogIn from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import SignUp from "./pages/SignupPage";
import Welcome from "./pages/WelcomePage";
import Password from "./pages/PasswordPage";
import AddExpense from "./pages/AddExpensePage";
import AuthContext from "./store/auth-context";
import { ExpenseContextProvider } from "./store/expense-context";
import { expensesActions } from "./store/expenses";

let initialState = true;

function App() {
  const authCtx = useContext(AuthContext);

  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const expenseAmount = useSelector((state) => state.expenses.quantity);
  const email = useSelector((state) => state.auth.email);

  let newEmail;

  if (email) {
    const email1 = email.replace("@", "");
    newEmail = email1.replace(".", "");
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const amountData = async () => {
      const response = await fetch(
        `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/amount${newEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenseAmount),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };

    if (initialState) {
      initialState = false;
      return;
    }
    amountData().catch((error) => {
      alert(error.message);
    });
  }, [expenseAmount]);

  useEffect(() => {
    const fetchAmountData = async () => {
      const response = await fetch(
        `https://expense-tracker-ade4f-default-rtdb.firebaseio.com/amount${newEmail}.json`
      );

      const data = await response.json();
      dispatch(expensesActions.replaceAmount(data));

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };
    fetchAmountData().catch((error) => {
      alert(error.message);
    });
  }, [dispatch]);

  return (
    <main>
      <Route path="/" exact>
        <SignUp></SignUp>
      </Route>
      <Route path="/login">
        <LogIn></LogIn>
      </Route>
      <Route path="/welcome">
        {isLogin && <Welcome></Welcome>}
        {!isLogin && <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/completeprofile">
        {isLogin && <Profile></Profile>}
        {!isLogin && <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/forgotpassword">
        <Password></Password>
      </Route>
      <Route path="/addexpense">
        {isLogin && <AddExpense></AddExpense>}
        {!isLogin && <Redirect to="/login"></Redirect>}
      </Route>
    </main>
  );
}

export default App;
