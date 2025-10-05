import "./NotesSection.css";

import { SECTION_NAME_BY_KEY } from "../data";

export default function NotesSection({ section, active, setNotesSection }) {
    return (
        <div
            className={`notesSection ${active ? "active" : ""}`}
            onClick={() => setNotesSection(section)}
        >
            <h5
                className={`themedText bold`}
                style={
                    active
                        ? { color: "var(--primaryColor)" }
                        : { color: "var(--inverseColor)" }
                }
            >
                {SECTION_NAME_BY_KEY[section]}
            </h5>
        </div>
    );
}
