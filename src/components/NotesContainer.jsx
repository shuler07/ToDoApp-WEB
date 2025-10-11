import "./NotesContainer.css";

import { useContext } from "react";
import { MainContext } from "../pages/MainPage";
import { INDICATOR_NAME_BY_STATUS } from "../data";

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
            <div className={`noteElementIndicator ${note.status}`}>
                <h5 className="themedText bold black">{INDICATOR_NAME_BY_STATUS[note.status]}</h5>
            </div>
            <h1
                className="themedText bold"
            >
                {note.title}
            </h1>
            <p className="themedText">
                {note.text}
            </p>
        </div>
    );
}
