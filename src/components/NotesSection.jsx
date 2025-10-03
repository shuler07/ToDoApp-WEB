import "./NotesSection.css";

import { SECTION_NAME_BY_KEY } from "../data";

export default function NotesSection({ section, active, setNotesSection }) {
    return (
        <div
            className={`notesSection ${active ? "active" : ''}`}
            onClick={() => setNotesSection(section)}
        >
            <h4 className={`themedText bold ${active ? "black" : "white"}`}>
                {SECTION_NAME_BY_KEY[section]}
            </h4>
        </div>
    );
}
