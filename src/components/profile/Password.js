import { useContext, useRef, useState } from "react";

import classes from './Password.module.css';
import AuthContext from "../../store/auth-context";

const PasswordChange = () => {
  const emailsentInputRef = useRef("");

  const [sendingRequest,setRequest]=useState(false)

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const email=emailsentInputRef.current.value

    setRequest(true)

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCUBxdcpTl3dsdRWOLPWwE-R_c1i7gbMsA",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    ).then((response) => {
        setRequest(false)
        if (response.ok) {
          console.log("Email Sent");
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

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.auth}>
        <h2>Forgot Password</h2>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailsentInputRef} required/>
        </div>
        <div className={classes.actions}> 
          {!sendingRequest && <button>Send Link</button>}
          {sendingRequest && <button>Loading...</button>}
        </div>
      </div>
    </form>
  );
};

export default PasswordChange;
