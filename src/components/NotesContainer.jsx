import "./NotesContainer.css";

import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

export default function NotesContainer({ notes }) {
    const { setNoteOpened, openedNoteData, notesSection } =
        useContext(MainContext);

    const ShowNotes = () => {
        return notes.map((value) => {
            if (value.status == notesSection)
                return (
                    <NoteElement
                        key={`keyNote${value.id}`}
                        setNoteOpened={setNoteOpened}
                        openedNoteData={openedNoteData}
                        value={value}
                    />
                );
        });
    };

    return <div className="notesContainer">{ShowNotes()}</div>;
}

function NoteElement({ setNoteOpened, openedNoteData, value }) {
    const { id, title, text, status } = value;

    const handleClickNote = () => {
        openedNoteData.current = { id, title, text, status };
        document.body.style.overflow = "hidden";
        setNoteOpened(true);
    };

    return (
        <div className="noteElement" onClick={handleClickNote}>
            <div className={`noteElementIndicator ${status}`} />
            <h1 className="themedText white bold">{title}</h1>
            <p className="themedText white">{text}</p>
        </div>
    );
}
