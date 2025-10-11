import "./NoteAddTagWindow.css";

import { useRef, useState } from "react";

import { MAX_TAG_LENGTH } from "../data";

export default function NoteAddTagWindow({ tags, setTags, setAddTagOpened }) {
    const [tagText, setTagText] = useState("");
    const tagInput = useRef();

    const handleChangeTag = (e) => {
        setTagText(e.target.value);
    }

    const handleClickAdd = () => {
        setTags((prev) => {
            const _prev = structuredClone(prev);
            _prev.push(tagText);
            return _prev;
        });
        setAddTagOpened(false);
    };

    const addButtonDisabled = tags.includes(tagText) || tagText == 'All' || tagText == '';

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
                >
                    Add tag
                </h4>
                <img
                    className="closeButton clickable"
                    onClick={() => setAddTagOpened(false)}
                    src="./icons/close.svg"
                    style={{ filter: 'var(--imageTint)' }}
                />
            </div>
            <div id="addTagContainer">
                <input
                    id="addTagInput"
                    className="themedText bold"
                    placeholder="Enter tag"
                    value={tagText}
                    maxLength={MAX_TAG_LENGTH}
                    onChange={handleChangeTag}
                    ref={tagInput}
                />
                <button
                    className="addTagButton clickable"
                    onClick={handleClickAdd}
                    disabled={addButtonDisabled}
                >
                    <img
                        src={addButtonDisabled ? "./icons/close.svg" : "./icons/addPlus.svg"}
                        style={{
                            userSelect: "none",
                            width: "1rem",
                            height: "1rem",
                            filter: 'var(--imageTint)'
                        }}
                    />
                </button>
            </div>
        </div>
    );
}
