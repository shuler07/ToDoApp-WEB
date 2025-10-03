import "./NoteWindow.css";

import { useState, useContext } from "react";
import { MainContext } from "../pages/MainPage";

import { API_ROUTES } from "../data";

export default function NoteWindow({ setNotes }) {
    const { setNoteOpened, openedNoteData } = useContext(MainContext);
    let note = openedNoteData.current;

    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);

    const closeNoteWindow = () => {
        document.body.style.overflowY = "auto";
        if (note.title !== title || note.text !== text) UpdateNote({title, text});
        setNoteOpened(false);
    };

    const DeleteNote = async () => {
        try {
            const response = await fetch(API_ROUTES["delete_note"], {
                method: "DELETE",
                body: JSON.stringify({ id: note.id }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            
            const data = await response.json();
            console.log("Deleting note:", data);

            if (data.success) {
                setNotes((prev) => {
                    const _notes = structuredClone(prev);
                    _notes['trash'] = _notes['trash'].filter((value) => value.id != note.id);
                    return _notes;
                });
                closeNoteWindow();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const CreateNote = async () => {
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

    const UpdateNote = async (updates) => {
        try {
            const response = await fetch(API_ROUTES["update_note"], {
                method: "PUT",
                body: JSON.stringify({
                    ...note,
                    ...updates
                }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Updating note:", data);

            if (data.success) {
                setNotes((prev) => {
                    const _notes = structuredClone(prev);
                    const _note = _notes[note.status].find((value) => value.id == note.id)
                    if (Object.hasOwn(updates, 'status')) {
                        _notes[note.status] = _notes[note.status].filter((value) => value != _note);
                        _note.status = updates.status;
                        _notes[updates.status].push(_note);
                    }
                    _note.title = updates.title;
                    _note.text = updates.text;
                    note = _note;
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
                onClick={() => UpdateNote({title, text, status: "trash"})}
            >
                <p>Delete</p>
            </div>
        ),
        completed: (
            <div
                className="themedButton delete accent"
                onClick={() => UpdateNote({title, text, status: "trash"})}
            >
                <p>Delete</p>
            </div>
        ),
        trash: (
            <div
                className="themedButton base accent"
                onClick={() => UpdateNote({title, text, status: "not_completed"})}
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
                onClick={() => UpdateNote({title, text, status: "completed"})}
            >
                <p>Complete</p>
            </div>
        ),
        completed: (
            <div
                className="themedButton base primary"
                onClick={() => UpdateNote({title, text, status: "not_completed"})}
            >
                <p>Uncomplete</p>
            </div>
        ),
        trash: (
            <div
                className="themedButton delete primary"
                onClick={() => DeleteNote()}
            >
                <p>Delete forever</p>
            </div>
        ),
        creating: (
            <div className="themedButton base primary" onClick={() => CreateNote()}>
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
                    {button_secondary[note.status]}
                    {button_primary[note.status]}
                </div>
            </div>
        </div>
    );
}
