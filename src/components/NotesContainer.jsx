import "./NotesContainer.css";

import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

export default function NotesContainer({ notes, selectedTag }) {
    const { setNoteOpened, openedNoteData } = useContext(MainContext);

    const ShowNotes = () => {
        return notes.map((value, index) => (
            <NoteElement
                key={`keyNote${selectedTag}${index}`}
                setNoteOpened={setNoteOpened}
                openedNoteData={openedNoteData}
                note={value}
            />
        ));
    };

    return <div className="notesContainer">{notes && ShowNotes()}</div>;
}

function NoteElement({ setNoteOpened, openedNoteData, note }) {
    const handleClickNote = () => {
        openedNoteData.current = note;
        document.body.style.overflow = "hidden";
        setNoteOpened(true);
    };

    return (
        <div className="noteElement" onClick={handleClickNote}>
            <div className={`noteElementIndicator ${note.status}`} />
            <h1
                className="themedText bold"
                style={{ color: "var(--inverseColor)" }}
            >
                {note.title}
            </h1>
            <p className="themedText" style={{ color: "var(--inverseColor)" }}>
                {note.text}
            </p>
        </div>
    );
}
