import "./SignInPage.css";

import { useState, useRef } from "react";

import ThemedButton from "../components/ThemedButton";
import ThemedInput from "../components/ThemedInput";

export default function SignInPage() {
    const [isRegister, setIsRegister] = useState(true);

    const handleClickRegister = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                body: JSON.stringify({ email: _email, password: _password }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Registering user:", data);

            if (data.isLoggedIn) {
                window.localStorage.setItem("access_token", data.access_token);
                window.location.pathname = "";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickLogin = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                body: JSON.stringify({ email: _email, password: _password }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Logining user:", data);

            if (data.isLoggedIn) {
                window.localStorage.setItem("access_token", data.access_token);
                window.location.pathname = "";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const confirmButtonTexts = ["Login", "Register"];
    const confirmButtonEvents = [handleClickLogin, handleClickRegister];
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
                    <ThemedInput hint="Email" type="email" ref={emailRef} />
                    <ThemedInput
                        hint="Password"
                        type="password"
                        ref={passwordRef}
                    />
                    <ThemedButton
                        text={confirmButtonTexts[isRegister ? 1 : 0]}
                        event={confirmButtonEvents[isRegister ? 1 : 0]}
                    />
                    <ThemedButton
                        text={switchButtonTexts[isRegister ? 1 : 0]}
                        event={() => setIsRegister((prev) => !prev)}
                    />
                </div>
            </div>
        </>
    );
}
