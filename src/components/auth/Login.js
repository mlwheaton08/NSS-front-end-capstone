import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../views/ApplicationViews.css"

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "capstone_user",
            JSON.stringify({
              id: user.id,
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  const loginButtonReady = () => {
    if (email){
      return "button--login ready"
    } else {
      return "button--login"
    }
  }

  return <>
    <div className="hero">
        <h1 id="title">Aimless - mobile</h1>
    </div>

    <section className="container--login-form">
      <form className="form--login" onSubmit={handleLogin}>
        <fieldset>
          <input id="input--email-login"
            type="email"
            value={email}
            onChange={(evt) => set(evt.target.value)}
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <button className={loginButtonReady()} type="submit">Sign in</button>
        </fieldset>
      </form>
      <div>
        <Link id="link--register" to="/register">Not a member yet?</Link>
      </div>
    </section>
  </>
};
