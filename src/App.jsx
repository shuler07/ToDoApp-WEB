import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageBackground from "./components/PageBackground";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        checkLogin();
    }, []);

    async function checkLogin() {
        const access_token = window.localStorage.getItem("access_token");

        if (!access_token) return;
        try {
            const response = await fetch("http://localhost:8000/me", {
                method: "PUT",
                body: JSON.stringify({ access_token }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Checking login:", data);

            if (data.isLoggedIn) setIsLoggedIn(data.isLoggedIn);
            else refreshUser();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function refreshUser() {
        try {
            const response = await fetch("http://localhost:8000/refresh", {
                method: "PUT",
                credentials: "include",
            });

            const data = await response.json();
            console.log("Refreshing user:", data);

            if (data.isLoggedIn) {
                window.localStorage.setItem("access_token", data.access_token);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <BrowserRouter basename="/ToDoApp-WEB/">
            <PageBackground />
            <Routes>
                <Route index element={<MainPage isLoggedIn={isLoggedIn} />} />
                <Route path="/sign_in" element={<SignInPage />} />
            </Routes>
        </BrowserRouter>
    );
}
