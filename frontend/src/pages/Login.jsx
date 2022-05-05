/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const register = () => {
    axios
      .post("http://localhost:8000/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.warn(response);
      });
  };
  const login = () => {
    axios
      .post("http://localhost:8000/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/login").then((response) => {
      // console.warn(response);
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="log-reg">
      <div className="registration">
        <h1>Registration</h1>
        <label htmlFor="username">Enter an username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label htmlFor="password">Choice a password</label>
        <input
          type="text"
          ide="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button type="button" onClick={register}>
          Register
        </button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Your username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="your password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
      <h1>{loginStatus ? `Welcome ${loginStatus}` : "Login please..."}</h1>
    </div>
  );
}
export default Login;
