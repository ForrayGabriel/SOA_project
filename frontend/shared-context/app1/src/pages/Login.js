import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"

import css from "./Login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const authUrl = 'http://localhost:3000/api/auth/login';

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    axios.post(authUrl, { username, password }, config)
      .then(response => {
        //get token from response
        const token = response.data.access_token;

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = '/'

      })
      .catch(err => console.log(err));
  };

  return (
    <div className="Login">
      <Form className="FormClass" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username :</Form.Label><br/>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group><br/>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password :</Form.Label><br/>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          <span></span>
          Login
        </Button>
      </Form>
    </div>
  );
}
export default Login