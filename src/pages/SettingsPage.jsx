import "./SettingsPage.css";

import { ROOT_PATHNAME, config, UpdateConfig } from "../data";

export default function SettingsPage() {
    return (
        <div id="settingsPageBg" className="fixedElementFullScreen">
            <div id="settingsHeader">
                <SettingsBackButton />
            </div>
            <div id="settingsMain">
                <SettingsAccountSection />
                <SettingsAppearanceSection />
            </div>
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

function SettingsAccountSection() {
    const handleClickChangeUserName = () => {
        console.log("changing username...");
    };

    const handleClickChangeEmail = () => {
        console.log("changing email...");
    };

    const handleClickChangePassword = () => {
        console.log("changing password...");
    };

    const handleClickSignout = () => {
        console.log("signing out...");
    };

    const GetBlocks = () => {
        const blocks = [
            {
                title: "Change username",
                iconPath: "./icons/editPencil.svg",
                action: handleClickChangeUserName,
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
        if (config.theme == 'light') {
            UpdateConfig({theme: 'dark'});
            document.querySelector('img[src="./icons/sun.svg"]').src = './icons/moon.svg';
        } else {
            UpdateConfig({theme: 'light'});
            document.querySelector('img[src="./icons/moon.svg"]').src = './icons/sun.svg';
        };
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
            <SettingsSectionBlock key={`keySettingsAppearance${index}`} {...value} />
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
            <img className="themedImg" src={iconPath} />
            <h5
                className="themedText bold"
                style={{ color: "var(--inverseColor)" }}
            >
                {title}
            </h5>
        </div>
    );
}



export function ApplyTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('lightTheme', 'darkTheme')

    switch (config.theme) {
        case 'light':
            htmlElement.classList.add('lightTheme');
            break;
        case 'dark':
            htmlElement.classList.add('darkTheme');
            break;
    };
}