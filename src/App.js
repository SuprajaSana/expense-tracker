import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";


import LogIn from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import SignUp from "./pages/SignupPage";
import Welcome from "./pages/WelcomePage";
import Password from "./pages/PasswordPage";
import AddExpense from "./pages/AddExpensePage";
import AuthContext from "./store/auth-context";
import { ExpenseContextProvider } from "./store/expense-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <ExpenseContextProvider>
    <main>
      <Route path="/" exact>
        <SignUp></SignUp>
      </Route>
      <Route path="/login">
        <LogIn></LogIn>
      </Route>
      <Route path="/welcome">
        {authCtx.isLoggedIn && <Welcome></Welcome>}
        {!authCtx.isLoggedIn && <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/completeprofile">
        {authCtx.isLoggedIn && <Profile></Profile>}
        {!authCtx.isLoggedIn && <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/forgotpassword">
        {authCtx.isLoggedIn && <Password></Password>}
        {!authCtx.isLoggedIn && <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/addexpense">
        {authCtx.isLoggedIn && <AddExpense></AddExpense>}
        {!authCtx.isLoggedIn && <Redirect to="/login"></Redirect>}
      </Route>
    </main>
    </ExpenseContextProvider>
  );
}

export default App;
