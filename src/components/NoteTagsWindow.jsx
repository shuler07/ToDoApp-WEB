import "./NoteTagsWindow.css";

import { COLORS_BY_TAGS } from "../data";

export default function NoteTagsWindow({
    tags,
    setTags,
    setTagsOpened,
    setAddTagOpened,
}) {
    const GetTags = () => {
        return tags.map((value, index) => {
            if (value != "All")
                return (
                    <TagEditElement
                        key={`keyEditTag${index}`}
                        name={value}
                        setTags={setTags}
                    />
                );
        });
    };

    const handleClickClose = () => {
        setTagsOpened(false);
        setAddTagOpened(false);
    };

    return (
        <div id="noteTagsWindow">
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
                    Tags
                </h4>
                <img
                    className="closeButton clickable"
                    onClick={handleClickClose}
                    src="./icons/close.svg"
                    style={{ filter: 'var(--imageTint)' }}
                />
            </div>
            <div id="noteTagsContainer">
                {GetTags()}
                <TagEditAddNewButton setAddTagOpened={setAddTagOpened} />
            </div>
        </div>
    );
}

function TagEditElement({ name, setTags }) {
    const color = COLORS_BY_TAGS[name]
        ? COLORS_BY_TAGS[name]
        : COLORS_BY_TAGS["colornotfound"];

    const handleClickRemoveTag = () => {
        setTags((prev) => prev.filter((value) => value != name));
    };

    return (
        <div style={{ display: "flex", gap: ".5rem" }}>
            <div className="tagEditElement" style={{ background: color }}>
                <h6 className="themedText bold white">{name}</h6>
            </div>
            <div
                className="tagEditElementRemoveButton clickable"
                onClick={handleClickRemoveTag}
            >
                <img
                    src="./icons/removeMinus.svg"
                    style={{
                        userSelect: "none",
                        width: "1rem",
                        height: "1rem",
                        filter: 'var(--imageTint)'
                    }}
                />
            </div>
        </div>
    );
}

function TagEditAddNewButton({ setAddTagOpened }) {
    return (
        <div>
            <div
                id="tagEditAddNew"
                className="tagEditElement clickable"
                onClick={() => setAddTagOpened(true)}
            >
                <h6 className="themedText">Add new tag</h6>
                <img
                    src="./icons/addPlus.svg"
                    style={{
                        userSelect: "none",
                        width: "1rem",
                        height: "1rem",
                        filter: 'var(--imageTint)'
                    }}
                />
            </div>
        </div>
    );
}
