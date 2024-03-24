import './App.css';
import React from 'react';
import axios from './api/axios'
import { useState } from "react";

const loginUrl = 'api/login';

const Login = ({ currentForm, setCurrentForm, userLogin, setUserLogin, data, setData }) => {

    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loginSuccess, setLoginSuccess] = useState(1)

    const handleSubmit = async e => {

        e.preventDefault();

        console.log(login, email, password)
        setUserLogin(login);

        try {
            const response = await axios.post(loginUrl, JSON.stringify({
                login,
                password
            }),
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )


            if (response.data.message === "User not found!") {
                console.log("Wrong login or password")
                setLoginSuccess(0)
            }
            else if (response.data.message === "Login successfully") {

                setCurrentForm("page")
            }
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
        <div>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label className='loginLabels'>

                    Login:
                    <input id="login" type="text" onChange={(e) => setLogin(e.target.value)} /><br />

                </label>

                <label className='loginLabels'>
                    Password:
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

                </label>
                {
                    loginSuccess === 0 ? (
                        <div className='wrongLoginPasswordMsg'>
                            Niepoprawny login lub hasło
                        </div>
                    ) : (
                        <div></div>
                    )
                }

                <input className="submit" type="submit" value="Login" /><br /><br />
            </form>

        </div>
    );
}
export default Login;