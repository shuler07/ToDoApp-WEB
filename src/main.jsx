import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { ApplyTheme } from './pages/SettingsPage';

ApplyTheme();

const root = createRoot(document.getElementById("root"));
root.render(<App />);