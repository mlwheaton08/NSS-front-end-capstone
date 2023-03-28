import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../views/ApplicationViews.css"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    familyBrowsing: true
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "capstone_user",
            JSON.stringify({
              id: createdUser.id,
            })
          );

          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          // Duplicate email. No good.
          window.alert("Account with that email address already exists");
        } else {
          // Good email, create user.
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return <>
    <div className="hero">
        <h1 id="title">Aimless - mobile</h1>
    </div>

    <main style={{ textAlign: "center" }}>
      <form className="form--register" onSubmit={handleRegister}>
        <fieldset>
          <input id="input--name-register"
            onChange={updateUser}
            type="text"
            className="form-control"
            placeholder="Full Name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <input id="input--email-register"
            onChange={updateUser}
            type="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <button className="button--register" type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  </>
};
