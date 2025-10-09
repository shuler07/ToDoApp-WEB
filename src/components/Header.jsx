import "./Header.css";

import { useContext } from "react";
import { MainContext } from "../pages/MainPage";

import { useNavigate } from "react-router-dom";

export default function Header({
    searchNotes,
    searchText,
    setSearchText
}) {
    const { isLoggedIn, setSidebarOpened } = useContext(MainContext);

    return (
        <div id="headerContainer">
            <div id="headerBar">
                <div
                    id="notesSidebarButton"
                    className="clickable"
                    onClick={() => setSidebarOpened((prev) => !prev)}
                ></div>
                <HeaderSearch
                    searchNotes={searchNotes}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
                <HeaderAccount isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
}

function HeaderSearch({ searchNotes, searchText, setSearchText }) {
    const handleChangeSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        searchNotes(value);
    };

    return (
        <input
            id="headerSearch"
            placeholder="Search notes..."
            value={searchText}
            onChange={handleChangeSearch}
        ></input>
    );
}

function HeaderAccount({ isLoggedIn }) {
    const navigate = useNavigate();

    function HeaderAccountAvatar() {
        return <div id="headerAccountAvatar"></div>;
    }

    if (isLoggedIn) return <HeaderAccountAvatar />;
    else
        return (
            <div
                className="themedButton base primary"
                style={{ margin: ".5rem" }}
                onClick={() => navigate("/sign_in")}
            >
                <p>Sign in</p>
            </div>
        );
}
