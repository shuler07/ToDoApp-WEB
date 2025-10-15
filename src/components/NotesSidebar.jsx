import "./NotesSidebar.css";

import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

import { SECTION_NAME_BY_KEY, SETTINGS_PATHNAME, WIDTH_WHEN_SIDEBAR_HIDES } from "../data";

export default function NotesSidebar() {
    const {
        selectedSection,
        setSelectedSection,
        sidebarOpened,
        setSidebarOpened,
    } = useContext(MainContext);
    const sections = ["not_completed", "completed", "trash"];

    const GetSections = () => {
        return sections.map((value, index) => (
            <NotesSection
                key={`keySection${index}`}
                section={value}
                active={value == selectedSection}
                setSelectedSection={setSelectedSection}
                setSidebarOpened={setSidebarOpened}
            />
        ));
    };

    return (
        <div
            id="notesSidebar"
            className={`${sidebarOpened ? "opened" : "closed"}`}
        >
            <div id='notesUpperSidebar'>
                <img
                    className="themedImg"
                    src="./images/logo-700w.png"
                    style={{
                        width: "60%",
                        height: 'auto',
                        marginBottom: "1rem",
                    }}
                />
                {GetSections()}
            </div>
            <div id='notesLowerSidebar'>
                <SettingsSection />
            </div>
        </div>
    );
}

function NotesSection({
    section,
    active,
    setSelectedSection,
    setSidebarOpened,
}) {
    const handleClickSection = () => {
        if (window.innerWidth <= WIDTH_WHEN_SIDEBAR_HIDES)
            setSidebarOpened(false);
        setSelectedSection(section);
    };

    return (
        <div
            className={`notesSection ${active ? "active" : ""}`}
            onClick={handleClickSection}
        >
            <h5
                className='themedText bold'
                style={active ? { color: "var(--primaryColor)" } : {}}
            >
                {SECTION_NAME_BY_KEY[section]}
            </h5>
        </div>
    );
}

function SettingsSection({  }) {
    return (
        <div
            id='settingsSection'
            onClick={() => window.location.pathname = SETTINGS_PATHNAME}
        >
            <img className="themedImg" src='./icons/settings.svg' style={{ width: '1rem', height: '1rem' }} />
            <h5
                className='themedText bold'
                style={{ color: "var(--inverseColor)" }}
            >
                Settings
            </h5>
        </div>
    )
}