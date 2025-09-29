import { useContext, useEffect, useState } from "react";
import { MainContext } from "../pages/MainPage";

import NotesContainer from "./NotesContainer";
import CreateNoteButton from "./CreateNoteButton";
import NoteWindow from "./NoteWindow";

import { API_ROUTES } from "../data";

export default function NotesMain() {
    const { noteOpened, isLoggedIn } = useContext(MainContext);

    const [notes, setNotes] = useState([]);
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
            else setNotes(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const notesMainStyle = {
        padding: "1rem",
        width: "calc(100% - 2rem)",
        height: "calc(100% - 2rem)",
        background: "#343d6c",
        borderTopLeftRadius: "1rem",
    };

    return (
        <div style={{ width: "100%" }}>
            <div style={notesMainStyle}>
                {isLoggedIn && <NotesContainer notes={notes} />}
            </div>
            {isLoggedIn && <CreateNoteButton />}
            {noteOpened && (
                <NoteWindow setNotes={setNotes} getNotes={GetNotes} />
            )}
        </div>
    );
}
