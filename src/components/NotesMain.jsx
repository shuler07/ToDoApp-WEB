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
        GetNotes();
    }, []);

    async function GetNotes() {
        try {
            const access_token = window.localStorage.getItem("access_token");

            const response = await fetch(API_ROUTES["get_notes"], {
                method: "PUT",
                body: JSON.stringify({ access_token }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Getting notes:", data);
            if (Object.hasOwn(data, "error")) return;

            setNotes(data);
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
