import "./NotesMain.css";

import { memo, useContext, useRef } from "react";
import { MainContext } from "../pages/MainPage";

import NotesContainer from "./NotesContainer";
import CreateNoteButton from "./CreateNoteButton";
import NoteWindow from "./NoteWindow";

import { API_ROUTES, COLORS_BY_TAGS } from "../data";

export default function NotesMain() {
    const {
        isLoggedIn,
        noteOpened,
        notes,
        setNotes,
        showingNotes,
        selectedSection,
        selectedTag,
        setSelectedTag,
    } = useContext(MainContext);
    // useEffect(() => {
    //     if (isLoggedIn) GetNotes();
    // }, [isLoggedIn]);

    const GetNotes = async () => {
        try {
            const response = await fetch(API_ROUTES["get_notes"], {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Getting notes:", data);

            if (!Array.isArray(data)) return;
            else {
                const _notes = {
                    not_completed: {},
                    completed: {},
                    trash: {},
                };
                data.forEach((value) => {
                    if (!Object.hasOwn(_notes[value.status], "All"))
                        _notes[value.status]["All"] = [];
                    _notes[value.status]["All"].push(value);

                    value.tags.forEach((tag) => {
                        if (!Object.hasOwn(_notes[value.status], tag))
                            _notes[value.status][tag] = [];
                        _notes[value.status][tag].push(value);
                    });
                });
                setNotes(_notes);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const GetTags = () => {
        return Object.keys(notes[selectedSection]).map((value, index) => {
            if (value != "All")
                return (
                    <TagSelectElement
                        key={`keyTagSelect${index}`}
                        name={value}
                        active={value == selectedTag ? "active" : ""}
                        setSelectedTag={setSelectedTag}
                    />
                );
        });
    };

    let offsetX = 0;
    let isDragging = false;
    const tagsContainer = useRef();

    const handleMouseDown = (e) => {
        isDragging = true;
        offsetX = e.screenX;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const _offsetX = e.screenX;
        const delta = offsetX - _offsetX;
        tagsContainer.current.scrollLeft += delta;
        offsetX = _offsetX;
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    const MemoizedCreateNoteButton = memo(() => <CreateNoteButton />);

    return (
        <div id="notesMainWindow">
            {isLoggedIn && (
                <>
                    <div
                        autoFocus="true"
                        id="notesMainTagsContainer"
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        ref={tagsContainer}
                    >
                        {GetTags()}
                    </div>
                    <div id="notesMainNotesContainer">
                        <NotesContainer
                            notes={showingNotes}
                            tag={selectedTag}
                        />
                    </div>
                </>
            )}
            {isLoggedIn && <MemoizedCreateNoteButton />}
            {noteOpened && (
                <NoteWindow
                    setNotes={setNotes}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                />
            )}
        </div>
    );
}

function TagSelectElement({ name, active, setSelectedTag }) {
    const color = COLORS_BY_TAGS[name]
        ? COLORS_BY_TAGS[name]
        : COLORS_BY_TAGS["colornotfound"];

    return (
        <div
            className={`tagSelectElement clickable ${active}`}
            style={
                active === "active"
                    ? {
                          background: color,
                          border: `solid 2px color-mix(in srgb, ${color}, var(--inverseColor) 60%)`,
                      }
                    : {
                          background: `color-mix(in srgb, ${color}, var(--primaryColor) 60%)`,
                      }
            }
            onClick={() => setSelectedTag(name)}
        >
            <h6
                className="themedText bold white"
                style={{ userSelect: "none" }}
            >
                {name}
            </h6>
        </div>
    );
}
