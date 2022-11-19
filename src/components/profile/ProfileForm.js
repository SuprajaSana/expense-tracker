import { useRef, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const nameInputRef = useRef("");
  const urlInputRef = useRef("");

  const [update, setUpdate] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitProfileHnadler = (e) => {
    e.preventDefault();

    const nameValue = nameInputRef.current.value;
    const urlValue = urlInputRef.current.value;

    const token = authCtx.token;

    setUpdate(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAXlNUd-_iFiS1IigjkhHLNYUq2wkiqhec",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: nameValue,
          photoUrl: urlValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      setUpdate(false);
      if (response.ok) {
        console.log("User has successfully updated");
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
    <section className={classes.auth}>
      <h2>Contact details</h2>
      <form onSubmit={submitProfileHnadler}>
        <div className={classes.control}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" ref={nameInputRef} required></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="url">Profile photo URL</label>
          <input type="text" id="url" ref={urlInputRef} required></input>
        </div>
        <div className={classes.actions}>
          {!update && <button>Update</button>}
          {update && <p>Sending Request</p>}
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
