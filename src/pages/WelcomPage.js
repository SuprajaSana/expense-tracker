import { Link } from "react-router-dom";

import classes from "./WelcomePage.module.css";

const Welcome = () => {
  return (
    <div>
      <h1 className={classes.heading}>Welcome to Expense Tracker</h1>
      <div className={classes.text}>
        <p>Your Profile is incomplete</p>
        <Link to='/completeprofile'>Complete Profile</Link>
      </div>
    </div>
  );
};

export default Welcome;
