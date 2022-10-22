import {useState} from "react";
import { Button } from "react-bootstrap";
import "../../css/user-auth-page-styles.css"

const UserAuthPage = (props) => {
    const [username, setUsername] = useState('Username');
    const [email, setEmail] = useState('Email');
    const [password, setPassword] = useState('Password');
    const [confirmPassword, setConfirmPassword] = useState('Confirm Password');

    let headerText;
    let buttonText;
    let emailAndConfirmVisibilityClass;

    if(props.type === "login") {
        headerText = "Login"
        buttonText = "Login"
        emailAndConfirmVisibilityClass = "invisible"
    } else if(props.type === "signup") {
        headerText = "Create Account"
        buttonText = "Sign Up"
    }

    function clearField(fieldValue, fieldFunction) {
        //TODO: Make it so users cannot create an account with fields with "Username", "Email", "Password", and "ConfirmPassword"

        let isDefaultField = false;

        for(const fieldName of ["Username", "Email", "Password", "ConfirmPassword"]) {
            if(fieldValue === fieldName) {
                isDefaultField = true;
                console.log(isDefaultField)
            }
        }

        console.log(isDefaultField)

        if(isDefaultField) {
            fieldFunction('');
        }
    }

    return (
        <>
            <div className="user-auth-body-content">
                <div className="form-container">
                    <form className="user-auth-form">
                        <h1>{headerText}</h1>
                        <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)} onFocus={() => clearField(username, setUsername)}></input>
                        <input className={emailAndConfirmVisibilityClass} type="email" name="Email" value={email} onChange={({ target }) => setEmail(target.value)} onFocus={() => clearField(email, setEmail())}></input>
                        <input type="text" name="Password" value={password} onChange={({ target }) => setPassword(target.value)} onFocus={() => clearField(password, setPassword())}></input>
                        <input className={emailAndConfirmVisibilityClass} type="text" name="ConfirmPassword" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} onFocus={() => clearField(confirmPassword, setConfirmPassword())}></input>

                        <Button type="submit" href="recipes" className="custom-button" id="button" variant="outline-success">{buttonText}</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserAuthPage;