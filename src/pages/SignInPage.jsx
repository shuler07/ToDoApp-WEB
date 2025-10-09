import "./SignInPage.css";

import { useState, useRef } from "react";

import { API_ROUTES } from "../data";

export default function SignInPage() {
    const [isRegister, setIsRegister] = useState(true);

    const handleClickRegister = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;

        try {
            const response = await fetch(API_ROUTES["register"], {
                method: "POST",
                body: JSON.stringify({ email: _email, password: _password }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Registering user:", data);

            if (data.isRegistered) {
                console.log('Verification was sent to email');
            };
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickLogin = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;

        try {
            const response = await fetch(API_ROUTES["login"], {
                method: "POST",
                body: JSON.stringify({ email: _email, password: _password }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Logining user:", data);

            if (data.isLoggedIn) window.location.pathname = "/ToDoApp-WEB/";
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const switchButtonTexts = [
        "Don't have an account? Register",
        "Already have an account? Login",
    ];

    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <>
            <div
                style={{
                    width: "100dvw",
                    height: "100dvh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div id="signInContainer">
                    <input
                        className="themedInput"
                        placeholder="Email"
                        type="email"
                        ref={emailRef}
                    ></input>
                    <input
                        className="themedInput"
                        placeholder="Password"
                        type="password"
                        ref={passwordRef}
                    ></input>
                    <div
                        className="themedButton"
                        onClick={
                            isRegister ? handleClickRegister : handleClickLogin
                        }
                    >
                        <p className="themedText">
                            {isRegister ? "Register" : "Login"}
                        </p>
                    </div>
                    <div
                        className="themedButton"
                        onClick={() => setIsRegister((prev) => !prev)}
                    >
                        <p className="themedText">
                            {switchButtonTexts[Number(isRegister)]}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
