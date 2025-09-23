import "./NotesSidebar.css";

import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

import NotesSection from "./NotesSection";

export default function NotesSidebar() {
    const { notesSection, setNotesSection } = useContext(MainContext);
    const sections = ["not_completed", "completed", "trash"];

    const GetSections = () => {
        return sections.map((value, index) => (
            <NotesSection
                key={`keySection${index}`}
                section={value}
                active={value == notesSection}
                setNotesSection={setNotesSection}
            />
        ));
    };

    return <div id="notesSidebar">{GetSections()}</div>;
}
