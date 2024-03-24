import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

import axios from './api/axios'

import { useState } from "react";



const registerUrl = 'api/register';

const Registration = () => {

    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loginWrongSize, setLoginWrongSize] = useState(0)
    const [emailWrongSize, setEmailWrongSize] = useState(0)
    const [passwordWrongSize, setPasswordWrongSize] = useState(0)

    const [validEntries, setValidEntries] = useState(0);

    const handleSubmit = async e => {

        e.preventDefault();

        console.log(login, email, password)
        setLoginWrongSize(0)
        setEmailWrongSize(0)
        setPasswordWrongSize(0)
        if (login.length < 6) {
            console.log("Too short login - at least 6 characters");
            setLoginWrongSize(1)
            return;
        }
        else if (login.length > 24) {
            console.log("Too long login - at most 24 characters");
            setLoginWrongSize(1)
            return;
        }
        if (email.length < 6) {
            console.log("Too short email - at least 6 characters");
            setEmailWrongSize(1)
            return;
        }
        else if (email.length > 24) {
            console.log("Too long email - at most 24 characters");
            setEmailWrongSize(1)
            return;
        }
        if (password.length < 6) {
            console.log("Too short password - at least 6 characters");
            setPasswordWrongSize(1)
            return;
        }
        else if (password.length > 24) {
            console.log("Too long password - at most 24 characters");
            setPasswordWrongSize(1)
            return;
        }

        setValidEntries(1);

        try {
            const response = await axios.post(registerUrl, JSON.stringify({
                login,
                email,
                password
            }),
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )

            console.log(response.data)
            console.log(response.accessToken)
            console.log(JSON.stringify(response))

            //setSuccess(true)
            //clear forms
        }
        catch (err) {
            if (!err?.response) {
                console.log('No internet connection')
            }
            else if (err.response?.status === 409) {
                console.log('User name taken')
            }
            else {
                console.log('Registration failed')
            }

        }
    }

    return (
        <form className='loginForm' onSubmit={handleSubmit}>
            <label className='loginLabels'>
                Login:
                <input id="login" type="text" onChange={(e) => setLogin(e.target.value)} /><br />

            </label>

            <label className='loginLabels'>
                Email:
                <input id="login" type="text" onChange={(e) => setEmail(e.target.value)} /><br />

            </label>

            <label className='loginLabels'>
                Password:
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

            </label>

            {(loginWrongSize === 1 || passwordWrongSize === 1 || emailWrongSize === 1) ? (
                (loginWrongSize === 1 || passwordWrongSize === 1) ? (
                    (loginWrongSize === 1) ? (
                        <div className='wrongLoginPasswordMsg'>
                            Niepoprawny rozmiar loginu
                        </div>
                    ) : (
                        <div className='wrongLoginPasswordMsg'>
                            Niepoprawny rozmiar hasła
                        </div>
                    )
                ) : (
                    <div className='wrongLoginPasswordMsg'>
                        Niepoprawny rozmiar emaila
                    </div>
                )
            ) : (
                <div className='wrongLoginPasswordMsg'>

                </div>
            )}
            {(validEntries === 1 ? (
                <div className='successfulRegistrationMsg'>
                    Pomyślnie zarejestrowano nowego użytkownika. Klkając przycisk "Login here" możesz zalogować się na konto
                </div>
            ):
            (
                <div></div>
            ))}
            <input className="submit" type="submit" value="Register" /><br /><br />

        </form>
    );
}
export default Registration;
