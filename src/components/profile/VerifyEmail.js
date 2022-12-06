import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import classes from "./VerifyEmail.module.css";
import AuthContext from "../../store/auth-context";

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);

  const [emailVerify, setEmailVerify] = useState(false);

  //const token = authCtx.token;
  const token = useSelector((state) => state.auth.token);

  const history = useHistory();
  const dispatch = useDispatch();

  const emailVerifyHandler = () => {
    setEmailVerify(true);
    console.log(token);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAXlNUd-_iFiS1IigjkhHLNYUq2wkiqhec",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        console.log("Verified Email");
      } else {
        response.json().then((data) => {
          let errorMessage = "Authentication Failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    });
  };

  const logoutHandler = () => {
    //authCtx.logout();
    dispatch(authActions.logout());
    history.replace("/login");
  };

  return (
    <div>
      <div className={classes.action}>
        <button onClick={emailVerifyHandler}>Verify Email</button>
      </div>
      <div className={classes.control}>
        <button onClick={logoutHandler}>LOG OUT</button>
      </div>
    </div>
  );
};

export default VerifyEmail;
