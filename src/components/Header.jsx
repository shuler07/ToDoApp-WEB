import './Header.css'

import { useNavigate } from 'react-router-dom';
import ThemedButton from './ThemedButton';

export default function Header({ isLoggedIn }) {

    return (
        <div id='headerContainer'>
            <div id='headerBar'>
                <HeaderLogo />
                <HeaderAccount isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
};

function HeaderLogo() {

    const logoStyle = {
        padding: '1rem',
        width: '4rem',
        height: '1rem',
        background: '#4d81d4',
        borderRadius: '2rem'
    };

    const handleClickLogo = () => {
        window.location.pathname = '/ToDoApp-WEB/';
    };

    return (
        <div style={logoStyle} onClick={handleClickLogo}>
            
        </div>
    );
};

function HeaderAccount({ isLoggedIn }) {
    const navigate = useNavigate();

    function HeaderAccountAvatar() {
        return (
            <div id='headerAccountAvatar'></div>
        );
    };

    const handleClickSignIn = () => navigate('/sign_in');

    if (isLoggedIn) return <HeaderAccountAvatar />
    else return <ThemedButton text='Sign in' event={handleClickSignIn} />
};