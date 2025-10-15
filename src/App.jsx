import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageBackground from "./components/PageBackground";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SettingsPage from "./pages/SettingsPage";

import { API_ROUTES } from "./data";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // useEffect(() => {
    //     authenticateUser();
    // }, []);

    async function authenticateUser() {
        try {
            const response = await fetch(API_ROUTES['authenticate'], {
                method: "GET",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Checking access token:", data);

            if (data.isLoggedIn) setIsLoggedIn(data.isLoggedIn);
            else if (!Object.hasOwn(data, 'error')) refreshUser();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function refreshUser() {
        try {
            const response = await fetch(API_ROUTES['refresh'], {
                method: "GET",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            console.log("Checking refresh token:", data);

            if (data.isLoggedIn) setIsLoggedIn(true);
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
                <Route path='/settings' element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
