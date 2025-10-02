import "./Header.css";

import { useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn }) {
    return (
        <div id="headerContainer">
            <div id="headerBar">
                <HeaderLogo />
                <HeaderAccount isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
}

function HeaderLogo() {
    const logoStyle = {
        padding: "1rem",
        width: "4rem",
        height: "1rem",
        background: "#4d81d4",
        borderRadius: "2rem",
    };

    const handleClickLogo = () => {
        window.location.pathname = "/ToDoApp-WEB/";
    };

    return <div style={logoStyle} onClick={handleClickLogo}></div>;
}

function HeaderAccount({ isLoggedIn }) {
    const navigate = useNavigate();

    function HeaderAccountAvatar() {
        return <div id="headerAccountAvatar"></div>;
    }

    if (isLoggedIn) return <HeaderAccountAvatar />;
    else
        return (
            <div className="themedButton base primary" onClick={() => navigate("/sign_in")}>
                <p>Sign in</p>
            </div>
        );
}
