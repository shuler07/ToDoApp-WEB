import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

export default function CreateNoteButton() {
    const { setNoteOpened, openedNoteData } = useContext(MainContext);

    const handleClickCreateNote = () => {
        openedNoteData.current = {
            id: null,
            uid: null,
            title: '',
            text: '',
            status: 'creating',
            tags: []
        };
        setNoteOpened(true);
        document.body.style.overflowY = 'hidden';
    };

    const createNoteButtonStyle = {
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        width: "4rem",
        height: "4rem",
        borderRadius: "2rem",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        color: "black",
        fontWeight: "bold",
        cursor: "pointer",
        zIndex: 1,
    };

    return (
        <div style={createNoteButtonStyle} onClick={handleClickCreateNote}>
            +
        </div>
    );
}
