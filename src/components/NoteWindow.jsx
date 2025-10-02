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

    const handleClickDeleteNote = async () => {
        try {
            const response = await fetch(API_ROUTES["delete_note"], {
                method: "DELETE",
                body: JSON.stringify({ id }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            
            const data = await response.json();
            console.log("Deleting note:", data);

            if (data.success) {
                setNotes((prev) => {
                    const _notes = structuredClone(prev);
                    _notes['trash'] = _notes['trash'].filter((value) => value.id != id);
                    return _notes;
                });
                closeNoteWindow();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickCreateNote = async () => {
        try {
            const response = await fetch(API_ROUTES["create_note"], {
                method: "POST",
                body: JSON.stringify({ title, text }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Creating note:", data);

            if (data.success) {
                setNotes((prev) => {
                    const _notes = structuredClone(prev);
                    _notes['not_completed'].push(data.note);
                    return _notes;
                });
                closeNoteWindow();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickChangeNoteStatus = async (_status) => {
        try {
            const response = await fetch(API_ROUTES["change_note_status"], {
                method: "PUT",
                body: JSON.stringify({
                    id,
                    status: _status,
                }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Changing note status:", data);

            if (data.success) {
                setNotes((prev) => {
                    const _notes = structuredClone(prev);
                    const _note = _notes[status].find((value) => value.id == id)
                    _notes[status] = _notes[status].filter((value) => value != _note);
                    _note.status = _status;
                    _notes[_status].push(_note);
                    return _notes;
                });
                closeNoteWindow();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const button_secondary = {
        not_completed: (
            <div
                className="themedButton delete accent"
                onClick={() => handleClickChangeNoteStatus("trash")}
            >
                <p>Delete</p>
            </div>
        ),
        completed: (
            <div
                className="themedButton delete accent"
                onClick={() => handleClickChangeNoteStatus("trash")}
            >
                <p>Delete</p>
            </div>
        ),
        trash: (
            <div
                className="themedButton base accent"
                onClick={() => handleClickChangeNoteStatus("not_completed")}
            >
                <p>Restore</p>
            </div>
        ),
        creating: null,
    };

    const button_primary = {
        not_completed: (
            <div
                className="themedButton base primary"
                onClick={() => handleClickChangeNoteStatus("completed")}
            >
                <p>Complete</p>
            </div>
        ),
        completed: (
            <div
                className="themedButton base primary"
                onClick={() => handleClickChangeNoteStatus("not_completed")}
            >
                <p>Uncomplete</p>
            </div>
        ),
        trash: (
            <div
                className="themedButton delete primary"
                onClick={() => handleClickDeleteNote()}
            >
                <p>Delete forever</p>
            </div>
        ),
        creating: (
            <div className="themedButton base primary" onClick={handleClickCreateNote}>
                <p>Create</p>
            </div>
        ),
    };

    return (
        <div
            className="fixedElementFullScreen"
            style={{ background: "#00000080", zIndex: 1 }}
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
                    <img
                        className="closeButton"
                        onClick={closeNoteWindow}
                        src="./icons/closeButton.svg"
                    />
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
                    {button_secondary[status]}
                    {button_primary[status]}
                </div>
            </div>
        </div>
    );
}
