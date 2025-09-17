import './Header.css'

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import ThemedButton from './ThemedButton';

export default function Header() {

    const context = useContext(AppContext);

    return (
        <div id='headerContainer'>
            <div id='headerBar'>
                <HeaderLogo />
                <HeaderAccount isLoggedIn={context.isLoggedIn} />
            </div>
        </div>
    );
};

function HeaderLogo() {
    return (
        <div>

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