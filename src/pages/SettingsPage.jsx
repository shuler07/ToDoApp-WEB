import "./SettingsPage.css";

import {
    ROOT_PATHNAME,
    config,
    UpdateConfig,
    username,
    API_ROUTES,
    updateUsername,
} from "../data";
import { useRef, useState } from "react";

export default function SettingsPage({ isLoggedIn, setIsLoggedIn }) {
    const [actionData, setActionData] = useState(null);

    return (
        <div id="settingsPageBg" className="fixedElementFullScreen">
            <div id="settingsHeader">
                <SettingsBackButton />
            </div>
            <div id="settingsMain">
                {isLoggedIn && (
                    <SettingsAccountSection
                        setActionData={setActionData}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                )}
                <SettingsAppearanceSection />
            </div>
            {actionData && (
                <SettingsWindow {...actionData} setActionData={setActionData} />
            )}
        </div>
    );
}

function SettingsBackButton() {
    return (
        <div
            id="backButtonContainer"
            onClick={() => (window.location.pathname = ROOT_PATHNAME)}
        >
            <img className="themedImg" src="./icons/backArrowLeft.svg" />
            <h3
                className="themedText bold"
                style={{ color: "var(--inverseColor)" }}
            >
                Settings
            </h3>
        </div>
    );
}

function SettingsWindow({
    title,
    description,
    input,
    buttonConfirm,
    setActionData,
}) {
    return (
        <div id="settingsWindowBg" className="fixedElementFullScreen">
            <div id="settingsWindow">
                <img
                    className="themedImg closeButton clickable"
                    src="./icons/close.svg"
                    style={{ position: "absolute", top: "1rem", right: "1rem" }}
                    onClick={() => setActionData(null)}
                />
                <h3
                    className="themedText bold"
                    style={{ color: "var(--inverseColor)" }}
                >
                    {title}
                </h3>
                {description && (
                    <h5
                        className="themedText"
                        style={{
                            color: "var(--inverseColor)",
                            textAlign: "center",
                        }}
                    >
                        {description}
                    </h5>
                )}
                {input && (
                    <div>
                        <h5
                            className="themedText"
                            style={{
                                color: "var(--inverseColor)",
                                marginBottom: ".25rem",
                            }}
                        >
                            {input.label}
                        </h5>
                        <input
                            className="themedInput"
                            placeholder={input.placeholder}
                            ref={input.ref}
                        />
                    </div>
                )}
                {buttonConfirm && (
                    <button
                        className={`themedButton clickable ${buttonConfirm.classes}`}
                        onClick={buttonConfirm.action}
                    >
                        <p className="themedText bold">{buttonConfirm.text}</p>
                    </button>
                )}
            </div>
        </div>
    );
}

function SettingsAccountSection({ setActionData, setIsLoggedIn }) {
    const usernameInputRef = useRef();

    const handleClickChangeUsername = () => {
        setActionData({
            title: "Change username",
            input: {
                label: "New username",
                placeholder: username,
                ref: usernameInputRef,
            },
            buttonConfirm: {
                text: "Update",
                classes: "base primary",
                action: async () => {
                    const _username = usernameInputRef.current.value;
                    if (_username == username || _username.length < 4) return;

                    const response = await fetch(API_ROUTES.update_username, {
                        method: "PUT",
                        credentials: "include",
                        body: JSON.stringify({ username: _username }),
                        headers: { "Content-Type": "application/json" },
                    });

                    const data = await response.json();
                    console.log("Updating username:", data);

                    if (data.success) {
                        window.localStorage.setItem("username", _username);
                        updateUsername(_username);
                    }
                },
            },
        });
    };

    const handleClickChangeEmail = () => {
        console.log("changing email...");
    };

    const handleClickChangePassword = () => {
        console.log("changing password...");
    };

    const handleClickSignout = () => {
        setActionData({
            title: "Sign out",
            description:
                "Are you sure you want sign out? You'll have to sign in again",
            buttonConfirm: {
                text: "Sign out",
                classes: "delete primary",
                action: async () => {
                    const response = await fetch(API_ROUTES.signout, {
                        method: "DELETE",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    });

                    const data = await response.json();
                    console.log("Signing out:", data);

                    if (!data.isLoggedIn) {
                        setIsLoggedIn(false);
                        window.location.pathname = ROOT_PATHNAME;
                    }
                },
            },
        });
    };

    const GetBlocks = () => {
        const blocks = [
            {
                title: "Change username",
                iconPath: "./icons/editPencil.svg",
                action: handleClickChangeUsername,
            },
            {
                title: "Change email",
                iconPath: "./icons/editPencil.svg",
                action: handleClickChangeEmail,
            },
            {
                title: "Change password",
                iconPath: "./icons/editPencil.svg",
                action: handleClickChangePassword,
            },
            {
                title: "Sign out",
                iconPath: "./icons/exit.svg",
                action: handleClickSignout,
            },
        ];

        return blocks.map((value, index) => (
            <SettingsSectionBlock
                key={`keySettingsAccount${index}`}
                {...value}
            />
        ));
    };

    return (
        <div className="settingsSection">
            <h5 className="themedText" style={{ color: "var(--inverseColor)" }}>
                Account
            </h5>
            {GetBlocks()}
        </div>
    );
}

function SettingsAppearanceSection() {
    const handleClickChangeTheme = () => {
        if (config.theme == "light") {
            UpdateConfig({ theme: "dark" });
            document.querySelector('img[src="./icons/sun.svg"]').src =
                "./icons/moon.svg";
        } else {
            UpdateConfig({ theme: "light" });
            document.querySelector('img[src="./icons/moon.svg"]').src =
                "./icons/sun.svg";
        }
        ApplyTheme();
    };

    const blocks = [
        {
            title: "Theme",
            iconPath:
                config.theme == "light"
                    ? "./icons/sun.svg"
                    : "./icons/moon.svg",
            action: handleClickChangeTheme,
        },
    ];

    const GetBlocks = () => {
        return blocks.map((value, index) => (
            <SettingsSectionBlock
                key={`keySettingsAppearance${index}`}
                {...value}
            />
        ));
    };

    return (
        <div className="settingsSection">
            <h5 className="themedText" style={{ color: "var(--inverseColor)" }}>
                Appearance
            </h5>
            {GetBlocks()}
        </div>
    );
}

function SettingsSectionBlock({ title, iconPath, action }) {
    return (
        <div className="settingsSectionBlock" onClick={action}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <img className="themedImg" src={iconPath} />
                <h5
                    className="themedText bold"
                    style={{ color: "var(--inverseColor)" }}
                >
                    {title}
                </h5>
            </div>
        </div>
    );
}

export function ApplyTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("lightTheme", "darkTheme");

    switch (config.theme) {
        case "light":
            htmlElement.classList.add("lightTheme");
            break;
        case "dark":
            htmlElement.classList.add("darkTheme");
            break;
    }
}
