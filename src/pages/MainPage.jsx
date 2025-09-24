import { useState, useRef, createContext } from "react";

import Header from "../components/Header";
import NotesSidebar from "../components/NotesSidebar";
import NotesMain from "../components/NotesMain";

export const MainContext = createContext();

export default function MainPage({ isLoggedIn }) {
    const [noteOpened, setNoteOpened] = useState(false);
    const openedNoteData = useRef();

    const [notesSection, setNotesSection] = useState("not_completed");
    const getNotesRef = useRef();

    return (
        <MainContext.Provider
            value={{
                isLoggedIn,
                noteOpened,
                setNoteOpened,
                notesSection,
                setNotesSection,
                openedNoteData,
                getNotesRef,
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
