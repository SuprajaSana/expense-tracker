import { useRef, useState, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Login.module.css";
import { authActions } from "../../store/auth";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const ConfirmpasswordInputRef = useRef("");

  const [isLogin, setIsLogin] = useState(true);
  const [isSendingRequest, setSendingRequest] = useState(false);
  const [Error, setError] = useState(false);

  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;
    const ConfirmpasswordValue = ConfirmpasswordInputRef.current.value;

    setSendingRequest(true);

    if (passwordValue != ConfirmpasswordValue) {
      setError(true);
      alert("Password does not match");
      setSendingRequest(false);
    } else {
      setSendingRequest(true);
      if (isLogin) {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXlNUd-_iFiS1IigjkhHLNYUq2wkiqhec",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            setSendingRequest(false);
            if (response.ok) {
              return response.json();
            } else {
              response.json().then((data) => {
                let errorMessage = "Authentication Failed!";
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
                alert(errorMessage);
              });
            }
          })
          .then((data) => {
            // authCtx.login(data.idToken);
            //authCtx.login(data.idToken);
            console.log(data);
            console.log(data.email);
            //dispatch(authActions.login(data.idToken))
            dispatch(authActions.login(data.email));
            history.replace("/welcome");
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <input
            type="Confirm password"
            id="Confirm password"
            placeholder="Confirm Password"
            required
            ref={ConfirmpasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isSendingRequest && <button>Login</button>}
          {isSendingRequest && <p>Sending Request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          ></button>
          <NavLink className={classes.password} to="/forgotpassword">
            Forgot Password?
          </NavLink>
        </div>
        <div>
          <span>Don't have an account?</span>
          <NavLink className={classes.signup} to="/">
            SignUp
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default Login;
