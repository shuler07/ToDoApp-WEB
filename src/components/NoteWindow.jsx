import "./NoteWindow.css";

import { useState, useContext } from "react";
import { MainContext } from "../pages/MainPage";

import { API_ROUTES } from "../data";

export default function NoteWindow({ setNotes, getNotes }) {
    const { setNoteOpened, openedNoteData } = useContext(MainContext);
    const { id, status } = openedNoteData.current;

    const [title, setTitle] = useState(openedNoteData.current.title);
    const [text, setText] = useState(openedNoteData.current.text);

    const closeNoteWindow = () => {
        document.body.style.overflowY = "auto";
        setNoteOpened(false);
    };

    const handleClickCreateNote = async () => {
        const access_token = window.localStorage.getItem("access_token");

        try {
            const response = await fetch(API_ROUTES["create_note"], {
                method: "POST",
                body: JSON.stringify({ access_token, title, text }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Creating note:", data);

            if (data.success) {
                getNotes();
                closeNoteWindow();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickChangeNoteStatus = async () => {
        const access_token = window.localStorage.getItem("access_token");
        const new_status =
            status == "completed" ? "not_completed" : "completed";

        try {
            const response = await fetch(API_ROUTES["change_note_status"], {
                method: "PUT",
                body: JSON.stringify({
                    access_token,
                    id,
                    status: new_status,
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Changing note status:", data);

            if (data.success) {
                setNotes((prev) => {
                    prev.find((value) => value.id == id).status = new_status;
                    return prev;
                });
                closeNoteWindow();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div
            className="fixedElementFullScreen"
            style={{ background: "#00000080", zIndex: 5 }}
        >
            <div id="noteWindow">
                <div id="noteWindowHeader">
                    <input
                        name="Note title"
                        className="transparentInput themedText bold black"
                        value={title}
                        placeholder="Enter note title"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <div className="closeButton" onClick={closeNoteWindow}>
                        X
                    </div>
                </div>
                <div id="noteWindowMain">
                    <textarea
                        name="Note text"
                        className="themedTextArea"
                        value={text}
                        placeholder="Enter text"
                        onChange={(e) => {
                            setText(e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height =
                                "calc(" + e.target.scrollHeight + "px - 1rem)";
                        }}
                    ></textarea>
                </div>
                <div id="noteWindowFooter">
                    <div
                        className="themedButton"
                        onClick={
                            id
                                ? handleClickChangeNoteStatus
                                : handleClickCreateNote
                        }
                    >
                        <p>
                            {id
                                ? status == "completed"
                                    ? "Uncomplete"
                                    : "Complete"
                                : "Create"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
