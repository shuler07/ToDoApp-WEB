import "./NotesContainer.css";

import { useEffect, useState } from "react";

import { STATUS_MESSAGES } from "../data";

export default function NotesContainer({
    notesCount,
    setNoteOpened,
    openedNoteData,
    notesTab,
}) {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        GetNotes();
    }, [notesCount.current, notesTab]);

    async function GetNotes() {
        try {
            const access_token = window.localStorage.getItem("access_token");

            const response = await fetch("http://localhost:8000/get_notes", {
                method: "PUT",
                body: JSON.stringify({ access_token }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            const filtered_data = data.filter(value => value.status == notesTab);
            console.log('Getting notes:', filtered_data);

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
        <>
            <div className="notesBox">
                <h1 className="themedText white">
                    {STATUS_MESSAGES[notesTab]}
                </h1>
                <div className="notesContainer">
                    {notesCount.current != 0 && ShowNotes()}
                </div>
            </div>
        </>
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
            <div className={`noteElementIndicator ${status}`}>
                <p className="themedText white">{STATUS_MESSAGES[status]}</p>
            </div>
            <h1 className="themedText white bold">{title}</h1>
            <p className="themedText white">{text}</p>
        </div>
    );
}
