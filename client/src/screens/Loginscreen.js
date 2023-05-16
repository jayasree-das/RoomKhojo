import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Loginscreen() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const [password, setpassword] = useState();
  const [email, setemail] = useState();

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setloading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error error="Invalid Credentials" />}
          {success && <Success message="User Login Successful" />}
          <div className="login bs">
            <h1>Sign In/Log In</h1>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button
              className="btn-btn-dark mt-4 justify-content-center"
              onClick={login}
              style={{
                backgroundColor: "black",
                color: "whitesmoke",
                borderRadius: "6px",
                marginLeft: "35%",
                width: "25%",
              }}
            >
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
