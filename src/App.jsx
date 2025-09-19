import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageBackground from "./PageBackground";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";

export const AppContext = createContext();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        checkLogin();
    }, []);

    async function checkLogin() {
        const access_token = window.localStorage.getItem("access_token");
        if (!access_token) return;

        try {
            const response = await fetch(
                "https://todoapp-api-hy80.onrender.com/me",
                {
                    method: "PUT",
                    body: JSON.stringify({ access_token }),
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await response.json();
            console.log("Checking access token:", data);

            if (data.isLoggedIn) setIsLoggedIn(true);
            else refreshUser();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function refreshUser() {
        try {
            const response = await fetch(
                "https://todoapp-api-hy80.onrender.com/refresh",
                {
                    method: "PUT",
                    credentials: "include",
                }
            );

            const data = await response.json();
            console.log("Checking refresh token:", data);

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
            <AppContext.Provider
                value={{
                    isLoggedIn: isLoggedIn,
                }}
            >
                <PageBackground />
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="/sign_in" element={<SignInPage />} />
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    );
}
