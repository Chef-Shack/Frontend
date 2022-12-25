import { useState } from "react";
import { Button } from "react-bootstrap";
import "../../css/user-auth-page-styles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserAuthPage = (props) => {
  let navigate = useNavigate()

  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");
  const [confirmPassword, setConfirmPassword] = useState("Confirm Password");

  let headerText;
  let buttonText;
  let emailAndConfirmVisibilityClass;

  if (props.type === "login") {
    headerText = "Login";
    buttonText = "Login";
    emailAndConfirmVisibilityClass = "invisible";
  } else if (props.type === "signup") {
    headerText = "Create Account";
    buttonText = "Sign Up";
  }

  function clearField(fieldValue, fieldFunction) {
    //TODO: Make it so users cannot create an account with fields with "Username", "Email", "Password", and "Confirm Password"

    let isDefaultField = false;

    for (const fieldName of [
      "Username",
      "Email",
      "Password",
      "Confirm Password",
    ]) {
      if (fieldValue === fieldName) {
        isDefaultField = true;
      }
    }

    if (isDefaultField) {
      fieldFunction("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (props.type === "login") {
      // login logic
      const bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);

      axios
        .post("http://127.0.0.1:8000/members/login_user", bodyFormData)
        .then((res) => {
          if (res.data.success === true) {
            // login user
            window.localStorage.setItem("username", res.data.user);
            window.localStorage.setItem("authenticated", true);

            // success! redirect the user
            navigate("/recipes")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (props.type === "signup") {
      // signup logic
      const bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);
      bodyFormData.append("email", email);

      await axios
        .post("http://localhost:8000/members/register_user", bodyFormData)
        .then((result) => {
          // success! redirect the user
          navigate("/recipes")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="user-auth-body-content">
        <div className="form-container">
          <form className="user-auth-form" onSubmit={handleSubmit}>
            <h1>{headerText}</h1>
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              onFocus={() => clearField(username, setUsername)}
              required
            ></input>
            <input
              className={emailAndConfirmVisibilityClass}
              type="text"
              name="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              onFocus={() => clearField(email, setEmail)}
              required
            ></input>
            <input
              type="text"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              onFocus={() => clearField(password, setPassword)}
              required
            ></input>
            <input
              className={emailAndConfirmVisibilityClass}
              type="text"
              name="ConfirmPassword"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              onFocus={() => clearField(confirmPassword, setConfirmPassword)}
              required
            ></input>

            {props.type == 'login' && <p className="alternative-auth-message">or <Link to="/signup" className="alternative-auth-link">create an account</Link> </p>}
            {props.type == 'signup' && <p className="alternative-auth-message">or <Link to="/login" className="alternative-auth-link">login</Link> </p>}

            <Button
              type="submit"
              className="custom-button"
              id="button"
              variant="outline-success"
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserAuthPage;
