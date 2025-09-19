import "./MainPage.css";

import { useContext, useState, useRef } from "react";
import { AppContext } from "../App";

import Header from "../components/Header";
import NotesContainer from "../components/NotesContainer";

export default function MainPage() {
    const context = useContext(AppContext);

    const [noteOpened, setNoteOpened] = useState(false);
    const openedNoteData = useRef();
    const notesCount = useRef(0);

    const [notesTab, setNotesTab] = useState("not_completed");

    return (
        <>
            <Header />
            <pre>
                <button onClick={() => setNotesTab("completed")}>
                    To completed
                </button>
                <button onClick={() => setNotesTab("not_completed")}>
                    To not completed
                </button>
            </pre>
            {context.isLoggedIn && (
                <NotesContainer
                    notesCount={notesCount}
                    setNoteOpened={setNoteOpened}
                    openedNoteData={openedNoteData}
                    notesTab={notesTab}
                />
            )}
            {context.isLoggedIn && (
                <CreateNoteButton
                    setNoteOpened={setNoteOpened}
                    openedNoteData={openedNoteData}
                />
            )}
            {noteOpened && (
                <NoteWindow
                    setNoteOpened={setNoteOpened}
                    openedNoteData={openedNoteData.current}
                    notesCount={notesCount}
                    notesTab={notesTab}
                />
            )}
        </>
    );
}

function CreateNoteButton({ setNoteOpened, openedNoteData }) {
    const handleClickCreateNote = () => {
        openedNoteData.current = {
            id: null,
            title: "",
            text: "",
            status: "not_completed",
        };
        setNoteOpened(true);
    };

    return (
        <div id="createNoteButton" onClick={handleClickCreateNote}>
            +
        </div>
    );
}

function NoteWindow({ setNoteOpened, openedNoteData, notesCount, notesTab }) {
    const { id, status } = openedNoteData;

    const [title, setTitle] = useState(openedNoteData.title);
    const [text, setText] = useState(openedNoteData.text);

    const handleClickCloseNote = () => {
        document.body.style.overflowY = "scroll";
        setNoteOpened(false);
    };

    const handleClickCreateNote = async () => {
        const access_token = window.localStorage.getItem("access_token");

        try {
            const response = await fetch(
                "http://localhost:8000/create_new_note",
                {
                    method: "POST",
                    body: JSON.stringify({ access_token, title, text }),
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await response.json();
            console.log('Creating note:', data);

            if (data.success) {
                if (notesTab == 'not_completed') notesCount.current += 1;
                setNoteOpened(false);
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
            const response = await fetch(
                "http://localhost:8000/change_note_status",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        access_token,
                        id,
                        status: new_status,
                    }),
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await response.json();
            console.log('Changing note status:', data);

            if (data.success) {
                notesCount.current--;
                setNoteOpened(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div
            className="fixedElementFullScreen"
            style={{ background: "#00000044", zIndex: 5 }}
        >
            <div id="noteWindow">
                <div id="noteWindowHeader">
                    <input
                        name="Note title"
                        className="transparentInput"
                        value={title}
                        placeholder="Enter note title"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <div className="closeButton" onClick={handleClickCloseNote}>
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
                        <p className="themedText">
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
