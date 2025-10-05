import { useContext, useEffect, useState } from "react";
import { MainContext } from "../pages/MainPage";

import NotesContainer from "./NotesContainer";
import CreateNoteButton from "./CreateNoteButton";
import NoteWindow from "./NoteWindow";

import { API_ROUTES } from "../data";

export default function NotesMain() {
    const { noteOpened, isLoggedIn, notesSection } = useContext(MainContext);

    const [notes, setNotes] = useState({
        'not_completed': [],
        'completed': [],
        'trash': []
    });
    useEffect(() => {
        if (isLoggedIn) GetNotes();
    }, [isLoggedIn]);

    async function GetNotes() {
        try {
            const response = await fetch(API_ROUTES["get_notes"], {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Getting notes:", data);

            if (!Array.isArray(data)) return;
            else {
                const _notes = {
                    'not_completed': [],
                    'completed': [],
                    'trash': []
                };
                data.forEach(value => {
                    if (!_notes[value.status]) _notes[value.status] = [];
                    _notes[value.status].push(value);
                });
                setNotes(_notes);
            };
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const notesMainStyle = {
        padding: "1rem",
        width: "calc(100% - 2rem)",
        height: "calc(100% - 2rem)",
        background: "var(--secondaryColor)",
        borderTopLeftRadius: "1rem",
    };

    return (
        <div style={{ width: "100%" }}>
            <div style={notesMainStyle}>
                {isLoggedIn && <NotesContainer notes={notes[notesSection]} />}
            </div>
            {isLoggedIn && <CreateNoteButton />}
            {noteOpened && (
                <NoteWindow setNotes={setNotes} getNotes={GetNotes} />
            )}
        </div>
    );
}
