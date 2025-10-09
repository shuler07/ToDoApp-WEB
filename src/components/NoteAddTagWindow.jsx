import { useRef, useState } from "react";
import "./NoteAddTagWindow.css";

export default function NoteAddTagWindow({ setTags, setAddTagOpened }) {
    const [tagText, setTagText] = useState("");
    const tagInput = useRef();

    const handleClickAdd = () => {
        if (tagText === "") return;

        setTags((prev) => {
            const _prev = structuredClone(prev);
            _prev.push(tagText);
            return _prev;
        });
        setAddTagOpened(false);
    };

    return (
        <div id="noteWindowTagsAdd">
            <div
                style={{
                    height: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h4
                    className="themedText bold"
                    style={{ color: "var(--inverseColor)" }}
                >
                    Add tag
                </h4>
                <img
                    className="closeButton clickable"
                    onClick={() => setAddTagOpened(false)}
                    src="./icons/close.svg"
                />
            </div>
            <div id="addTagContainer">
                <input
                    id="addTagInput"
                    className="themedText bold white"
                    placeholder="Enter tag"
                    value={tagText}
                    maxLength={12}
                    onChange={(e) => setTagText(e.target.value)}
                    ref={tagInput}
                />
                <div
                    className="addTagButton clickable"
                    onClick={handleClickAdd}
                >
                    <img
                        src="./icons/addPlus.svg"
                        style={{
                            userSelect: "none",
                            width: "1rem",
                            height: "1rem",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
