import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

import NotesContainer from "./NotesContainer";
import CreateNoteButton from "./CreateNoteButton";
import NoteWindow from "./NoteWindow";

export default function NotesMain() {
    const { noteOpened, isLoggedIn } = useContext(MainContext);

    const notesMainStyle = {
        padding: "1rem 1rem 0rem 1rem",
        width: "calc(100% - 2rem)",
        height: "calc(100% - 1rem)",
        background: "#343d6c",
        borderTopLeftRadius: "1rem",
    };

    return (
        <div style={{ width: "100%" }}>
            <div style={notesMainStyle}>{isLoggedIn && <NotesContainer />}</div>
            {isLoggedIn && <CreateNoteButton />}
            {noteOpened && <NoteWindow />}
        </div>
    );
}
