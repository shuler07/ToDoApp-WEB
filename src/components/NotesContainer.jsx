import "./NotesContainer.css";

import { useContext, useEffect, useState } from "react";
import { MainContext } from "../pages/MainPage";

import { API_ROUTES } from "../data";

export default function NotesContainer() {
    const { notesCount, setNoteOpened, openedNoteData, notesSection } = useContext(MainContext);

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        GetNotes();
        document.body.style.overflowY = 'scroll';
    }, [notesCount.current, notesSection]);

    async function GetNotes() {
        try {
            const access_token = window.localStorage.getItem("access_token");

            const response = await fetch(API_ROUTES['get_notes'], {
                method: "PUT",
                body: JSON.stringify({ access_token }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            const filtered_data = data.filter(
                (value) => value.status == notesSection
            );
            console.log("Getting notes:", filtered_data);

            notesCount.current = filtered_data.length;
            setNotes(filtered_data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const ShowNotes = () => {
        return notes.map((value) => (
            <NoteElement
                key={`keyNote${value.id}`}
                notesCount={notesCount}
                setNoteOpened={setNoteOpened}
                openedNoteData={openedNoteData}
                value={value}
            />
        ));
    };

    return (
        <div className="notesContainer">
            {notesCount.current != 0 && ShowNotes()}
        </div>
    );
}

function NoteElement({ notesCount, setNoteOpened, openedNoteData, value }) {
    const { id, title, text, status } = value;

    const handleClickNote = () => {
        openedNoteData.current = { id, title, text, status, notesCount };
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
