import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./App.jsx";

function ApplyTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('lightTheme', 'darkTheme')

    let theme = window.localStorage.getItem('theme');
    if (theme === null) {
        theme = 'light';
        window.localStorage.setItem('theme', 'light');
    }

    switch (theme) {
        case 'light':
            htmlElement.classList.add('lightTheme');
            break;
        case 'dark':
            htmlElement.classList.add('darkTheme');
            break;
    };
}

ApplyTheme();

createRoot(document.getElementById("root")).render(<App />);
