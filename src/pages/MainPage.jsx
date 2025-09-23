import { useState, useRef, createContext } from "react";

import Header from "../components/Header";
import NotesSidebar from "../components/NotesSidebar";
import NotesMain from "../components/NotesMain";

export const MainContext = createContext();

export default function MainPage({ isLoggedIn }) {
    const [noteOpened, setNoteOpened] = useState(false);
    const openedNoteData = useRef();
    const notesCount = useRef(0);

    const [notesSection, setNotesSection] = useState("not_completed");

    return (
        <MainContext.Provider
            value={{
                noteOpened,
                setNoteOpened,
                openedNoteData,
                notesCount,
                notesSection,
                setNotesSection,
                isLoggedIn,
            }}
        >
            <Header isLoggedIn={isLoggedIn} />
            <div style={{
                position: 'relative',
                display: 'flex',
                gap: '1rem'
             }}>
                <NotesSidebar />
                <NotesMain />
            </div>
        </MainContext.Provider>
    );
}
