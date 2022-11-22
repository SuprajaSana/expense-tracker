import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Signup.module.css";

const Signup = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmpasswordRef = useRef("");

  const [error, setError] = useState(false);
  const [isSendingRequest, setSendingRequest] = useState(false);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;
    const confirmpassword = confirmpasswordRef.current.value;

    if (passwordValue != confirmpassword) {
      setError(true);
      alert("Password does not match");
      setSendingRequest(false);
    } else {
      setSendingRequest(true);

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXlNUd-_iFiS1IigjkhHLNYUq2wkiqhec",
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
      ).then((response) => {
        setSendingRequest(false);
        if (response.ok) {
          //return response.json();
          console.log("User has successfully signed up");
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
    }
  };

  return (
    <section className={classes.auth}>
      <h1>SignUp</h1>
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
            type="confirm password"
            id="confirm password"
            placeholder="Confirm Password"
            required
            ref={confirmpasswordRef}
          />
        </div>
        <div className={classes.actions}>
          {!isSendingRequest && <button>Sign Up</button>}
          {isSendingRequest && <p>Sending Request</p>}
          <button type="button" className={classes.toggle}></button>
        </div>
        <div>
          <span>Already have an account?</span>
          <NavLink className={classes.login} to="/login">
            Login
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default Signup;
