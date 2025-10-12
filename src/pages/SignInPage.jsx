import './SignInPage.css';

import { useState, useRef, useEffect } from 'react';

import InputLabel from '../components/InputLabel';
import { API_ROUTES } from '../data';

export default function SignInPage() {
    const [isRegister, setIsRegister] = useState(true);

    const handleClickRegister = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;
        const _confirmPassword = confirmPasswordRef.current.value;

        if (_email == '' || _password == '' || _password != _confirmPassword) {
            if (_email == '') setErrorMessage('Email field is empty');
            else if (_password == '') setErrorMessage('Password field is empty');
            else if (_password != _confirmPassword) setErrorMessage("Passwords doesn't match");
            return;
        } else setErrorMessage('');

        try {
            const response = await fetch(API_ROUTES['register'], {
                method: 'POST',
                body: JSON.stringify({ email: _email, password: _password }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            console.log('Registering user:', data);

            if (data.isRegistered) {
                console.log('Verification was sent to email');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClickLogin = async () => {
        const _email = emailRef.current.value;
        const _password = passwordRef.current.value;

        if (_email == '' || _password == '') {
            if (_email == '') setErrorMessage('Email field is empty');
            else if (_password == '') setErrorMessage('Password field is empty');
            return;
        } else setErrorMessage('');

        try {
            const response = await fetch(API_ROUTES['login'], {
                method: 'POST',
                body: JSON.stringify({ email: _email, password: _password }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            console.log('Logining user:', data);

            if (data.isLoggedIn) window.location.pathname = '/ToDoApp-WEB/';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const switchButtonTexts = ["Don't have an account? Register", 'Already have an account? Login'];

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div id='signinPageBg' className='fixedElementFullScreen'>
            <div id='signinContainer'>
                <div id='buttonBackToMain' onClick={() => (window.location.pathname = '/ToDoApp-WEB/')}>
                    <img src='./icons/backArrowLeft.svg' style={{ width: '2rem', height: '2rem', userSelect: 'none' }} />
                    <h5 className='themedText bold'>Back</h5>
                </div>
                <img src='./images/logo-700w.png' style={{ width: '60%', userSelect: 'none', filter: 'var(--imageTint)' }} />
                <InputLabel
                    label='Email'
                    inputId='emailInput'
                    autoComplete='email'
                    placeholder='mail@example.com'
                    type='email'
                    ref={emailRef}
                />
                <InputLabel
                    label='Password'
                    inputId='passwordInput'
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    placeholder='strongpassword123'
                    type='password'
                    ref={passwordRef}
                />
                {isRegister && (
                    <InputLabel
                        label='Confirm password'
                        inputId='confirmPasswordInput'
                        autoComplete='new-password'
                        placeholder='strongpassword123'
                        type='password'
                        ref={confirmPasswordRef}
                    />
                )}
                {errorMessage != '' && (
                    <div id='errorMessage'>
                        <h5 className='themedText bold' style={{ color: '#ff2222' }}>
                            {errorMessage}
                        </h5>
                    </div>
                )}
                <div
                    id='authButton'
                    className='themedButton base primary clickable'
                    onClick={isRegister ? handleClickRegister : handleClickLogin}
                >
                    <p className='themedText'>{isRegister ? 'Register' : 'Login'}</p>
                </div>
                <div id='switchAuthButton' onClick={() => {
                    setIsRegister((prev) => !prev);
                    setErrorMessage('');
                }}>
                    <h6 className='themedText bold'>{switchButtonTexts[Number(isRegister)]}</h6>
                </div>
            </div>
        </div>
    );
}
