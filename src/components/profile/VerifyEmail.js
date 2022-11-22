import classes from "./VerifyEmail.module.css";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);

  const [emailVerify, setEmailVerify] = useState(false);

  const token = authCtx.token;

  const emailVerifyHandler = () => {
    setEmailVerify(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAXlNUd-_iFiS1IigjkhHLNYUq2wkiqhec",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
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

  return (
    <div className={classes.action}>
      <button onClick={emailVerifyHandler}>Verify Email</button>
    </div>
  );
};

export default VerifyEmail;
