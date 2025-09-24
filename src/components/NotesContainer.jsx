import "./NotesContainer.css";

import { useContext, useEffect, useState } from "react";
import { MainContext } from "../pages/MainPage";

import { API_ROUTES } from "../data";

export default function NotesContainer() {
    const { setNoteOpened, openedNoteData, notesSection, getNotesRef } =
        useContext(MainContext);

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        GetNotes();
    }, [notesSection]);

    getNotesRef.current = GetNotes;

    async function GetNotes() {
        try {
            const access_token = window.localStorage.getItem("access_token");

            const response = await fetch(API_ROUTES["get_notes"], {
                method: "PUT",
                body: JSON.stringify({ access_token }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (Object.hasOwn(data, 'error')) return;

            const filtered_data = data.filter(
                (value) => value.status == notesSection
            );
            console.log("Getting notes:", filtered_data);

            setNotes(filtered_data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const ShowNotes = () => {
        return notes.map((value) => (
            <NoteElement
                key={`keyNote${value.id}`}
                setNoteOpened={setNoteOpened}
                openedNoteData={openedNoteData}
                value={value}
            />
        ));
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
