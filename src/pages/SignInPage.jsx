import "./SignInPage.css";

import { useState, useRef } from "react";

import InputLabel from "../components/InputLabel";
import { API_ROUTES, ROOT_PATHNAME } from "../data";

export default function SignInPage() {
    const [isRegister, setIsRegister] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const alertColor = alertMessage.startsWith("Verification")
        ? "#22ff22"
        : "#ff2222";

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const usernameRef = useRef();

    const handleClickRegister = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;
        const _confirmPassword = confirmPasswordRef.current.value;
        const _username = usernameRef.current.value;

        if (
            _email == "" ||
            _password == "" ||
            _password != _confirmPassword ||
            _username.length < 4
        ) {
            if (_email == "") setAlertMessage("Email field is empty");
            else if (_password == "")
                setAlertMessage("Password field is empty");
            else if (_password != _confirmPassword)
                setAlertMessage("Passwords doesn't match");
            else if (_username.length < 4)
                setAlertMessage("Username must be 4 characters at least");
            return;
        } else setAlertMessage("");

        try {
            const response = await fetch(API_ROUTES.register, {
                method: "POST",
                body: JSON.stringify({
                    email: _email,
                    password: _password,
                    username: _username,
                }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Registering user:", data);

            if (data.isRegistered)
                setAlertMessage("Verification was sent to your email");
            else if (data.error == "exists")
                setAlertMessage("User with such email already exists");
            else if (data.error == "unknown")
                setAlertMessage("Something went wrong. Try again later");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickLogin = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;

        if (_email == "" || _password == "") {
            if (_email == "") setAlertMessage("Email field is empty");
            else if (_password == "")
                setAlertMessage("Password field is empty");
            return;
        } else setAlertMessage("");

        try {
            const response = await fetch(API_ROUTES.login, {
                method: "POST",
                body: JSON.stringify({ email: _email, password: _password }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Logining user:", data);

            if (data.isLoggedIn) {
                window.localStorage.setItem("username", data.username);
                window.location.pathname = ROOT_PATHNAME;
            } else setAlertMessage("Invalid email or password");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const switchButtonTexts = [
        "Don't have an account? Register",
        "Already have an account? Login",
    ];

    return (
        <div id="signinPageBg" className="fixedElementFullScreen">
            <div
                id="signinContainer"
                style={{ height: isRegister ? "34rem" : "24rem" }}
            >
                <div
                    id="buttonBackToMain"
                    onClick={() => (window.location.pathname = ROOT_PATHNAME)}
                >
                    <img
                        className="themedImg"
                        src="./icons/backArrowLeft.svg"
                    />
                    <h5 className="themedText bold">Back</h5>
                </div>
                <img
                    className="themedImg"
                    src="./images/logo-700w.png"
                    style={{
                        width: "50%",
                        height: "auto",
                    }}
                />
                <InputLabel
                    label="Email"
                    inputId="emailInput"
                    autoComplete="email"
                    placeholder="mail@example.com"
                    type="email"
                    ref={emailRef}
                />
                <InputLabel
                    label="Password"
                    inputId="passwordInput"
                    autoComplete={
                        isRegister ? "new-password" : "current-password"
                    }
                    placeholder="strongpassword123"
                    type="password"
                    ref={passwordRef}
                />
                {isRegister && (
                    <InputLabel
                        label="Confirm password"
                        inputId="confirmPasswordInput"
                        autoComplete="new-password"
                        placeholder="strongpassword123"
                        type="password"
                        ref={confirmPasswordRef}
                    />
                )}
                {isRegister && (
                    <InputLabel
                        label="Username"
                        inputId="usernameInput"
                        autoComplete="username"
                        placeholder="User0123ddjw8"
                        type="text"
                        ref={usernameRef}
                    />
                )}
                {alertMessage != "" && (
                    <div id="alertMessage">
                        <h5
                            className="themedText bold"
                            style={{ color: alertColor }}
                        >
                            {alertMessage}
                        </h5>
                    </div>
                )}
                <div
                    id="authButton"
                    className="themedButton base primary clickable"
                    onClick={
                        isRegister ? handleClickRegister : handleClickLogin
                    }
                >
                    <p className="themedText">
                        {isRegister ? "Register" : "Login"}
                    </p>
                </div>
                <div
                    id="switchAuthButton"
                    onClick={() => {
                        setIsRegister((prev) => !prev);
                        setErrorMessage("");
                    }}
                >
                    <h6 className="themedText bold">
                        {switchButtonTexts[Number(isRegister)]}
                    </h6>
                </div>
            </div>
        </div>
    );
}
