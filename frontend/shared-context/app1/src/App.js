import { NameContextProvider } from '@shared-context/shared-library';
import React from 'react';

import css from "./App.css";

import Router from './routes'

import { setAuthToken } from './helpers/setAuthToken'

function App() {

  //check jwt token
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;