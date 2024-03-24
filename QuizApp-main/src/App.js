import { useState, useEffect } from "react";

import './App.css';
import marks from './Page'
import React from 'react';


import Login from './Login';
import Registration from './Registration'
import Page from "./Page";
import Ranking from "./Ranking";

const getRankingUrl = 'http://localhost:3001/api/db/ranking/';


function App() {

  const [myBool, setmyBool] = useState(true);
  const [token, setToken] = useState();

  const [logged, setLogged] = useState(false);

  const [currentForm, setCurrentForm] = useState('login');
  const [rankingPage, setRankingPage] = useState(' ');
  // const [rankingArray, setRankingArray] = useState([]);
  const [isFetched, setIsFetched] = useState(0);

  const [login, setLogin] = useState();

  function setRegisterForm() {
    setCurrentForm('register')
  }

  function setLoginForm() {
    setCurrentForm('login')
  }

  function setPageForm() {
    setCurrentForm('page')
  }

  const [data, setData] = useState([]);

  return (
    <header className="App-header">
      {
        currentForm === "login" || currentForm === "register" ? (
          <div className="App">

            <div id="loginForms">
              {
                currentForm === "login" ? (
                  <div>

                    <Login currentForm={currentForm} setCurrentForm={setCurrentForm} userLogin={login} setUserLogin={setLogin} data={data} setData={setData} /><br />
                    <a className='registerLabel'>Nie posiadasz konta? - zarejestruj się - <button className="loginRegistrationSubButton" onClick={setRegisterForm}>Register here!</button></a>

                  </div>

                ) :
                  (
                    <a>
                      <Registration />
                      <a className='registerLabel'>Posiadasz już konto? - zaloguj się - <button className="loginRegistrationSubButton" onClick={setLoginForm}  >Log in here!</button></a>
                    </a>

                  )
              }
            </div>
          </div>
        ) :
          <a>
            {
              rankingPage === ' ' ? (
                <div>
                  <Page login={login} setRankingPage={setRankingPage} data={data} />
                  <br />
                </div>
              ) :
                (
                  <div>
                    <Ranking setRankingPage={setRankingPage} rankingArray={data} />
                  </div>
                )
            }
          </a>

      }
    </header>
  );
}

export default App;
