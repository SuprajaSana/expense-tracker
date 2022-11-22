import { useRef, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const nameInputRef = useRef("");
  const urlInputRef = useRef("");

  const [update, setUpdate] = useState(false);
  const [editDetails, setDetails] = useState(false);
  const [displayName, setdisplayName] = useState();
  const [photoUrl, setphotoUrl] = useState();

  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  const submitProfileHnadler = (e) => {
    e.preventDefault();

    const nameValue = nameInputRef.current.value;
    const urlValue = urlInputRef.current.value;

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

  const editDetailsHandler = () => {
    setDetails(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAXlNUd-_iFiS1IigjkhHLNYUq2wkiqhec",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setUpdate(false);
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
        console.log(data);
        console.log(data.users);
        setdisplayName(data.users[0].displayName);
        console.log(data.users[0].displayName);
        setphotoUrl(data.users[0].photoUrl);
        console.log(data.users[0].photoUrl);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const updateHandler = () => {
    setUpdate(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAXlNUd-_iFiS1IigjkhHLNYUq2wkiqhec",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: displayName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      setUpdate(false);
      if (response.ok) {
        console.log("user updated");
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

  const displayNameHandler = (event) => {
    setdisplayName(event.target.value);
  };

  const photoUrlHandler = (event) => {
    setphotoUrl(event.target.value);
  };

  return (
    <section className={classes.auth}>
      <h2>Contact details</h2>
      <form onSubmit={submitProfileHnadler}>
        <div className={classes.control}>
          <label htmlFor="name">Full Name</label>
          {!editDetails && (
            <input type="text" id="name" ref={nameInputRef} required></input>
          )}
          {editDetails && (
            <input
              type="text"
              id="name"
              value={displayName}
              onChange={displayNameHandler}
              required
            ></input>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="url">Profile photo URL</label>
          {!editDetails && (
            <input type="text" id="url" ref={urlInputRef} required></input>
          )}
          {editDetails && (
            <input
              type="text"
              id="url"
              value={photoUrl}
              onChange={photoUrlHandler}
              required
            ></input>
          )}
        </div>
        <div className={classes.actions}>
          {!update && <button onClick={updateHandler}>Update</button>}
          {update && <p>Sending Request</p>}
          <button onClick={editDetailsHandler}>Edit Details</button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
