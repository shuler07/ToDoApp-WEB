import "./NotesContainer.css";

import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

export default function NotesContainer({ notes }) {
    const { setNoteOpened, openedNoteData } = useContext(MainContext);

    const ShowNotes = () => {
        return notes.map((value) => (
            <NoteElement
                key={`keyNote${value.id}`}
                setNoteOpened={setNoteOpened}
                openedNoteData={openedNoteData}
                note={value}
            />
        ));
    };

    return <div className="notesContainer">{ShowNotes()}</div>;
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
            <h1 className="themedText white bold">{note.title}</h1>
            <p className="themedText white">{note.text}</p>
        </div>
    );
}
