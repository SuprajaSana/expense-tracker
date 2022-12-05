import { Link, NavLink } from "react-router-dom";

import classes from "./WelcomePage.module.css";
import VerifyEmail from "../components/profile/VerifyEmail";

const Welcome = () => {
  return (
    <div>
      <h1 className={classes.heading}>Welcome to Expense Tracker</h1>
      <div className={classes.text}>
        <p>Your Profile is incomplete</p>
        <Link to="/completeprofile">Complete Profile</Link>
      </div>
      <VerifyEmail></VerifyEmail>
      <NavLink className={classes.control} to="/addexpense">
        <button>Expenses</button>
      </NavLink>
    </div>
  );
};

export default Welcome;
