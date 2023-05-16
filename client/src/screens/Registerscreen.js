import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success,setsuccess] = useState();

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();

  async function register() {
      if (password === cpassword) {
        const user = {
          name,
          email,
          password,
          cpassword,
        };
        try {
          setloading(true)
          const result  = (await axios.post('/api/users/register',user)).data
          setloading(false)
          setsuccess(true)
          setname('')
          setemail('')
          setpassword('')
          setcpassword('')
        } catch (error) {
          console.log(error)
          setloading(false)
          seterror(true)
        }
        
      } else {
        alert("password Not Matched");
      }
  }
  return (
    <div>
    {loading && (<Loader/>)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
        {success && (<Success message = 'Registration Successful...'/>)}
        {error && (<Error error='Email already registred'/>)}
          <div className="register bs">
            <h1>REGISTER HERE</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
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
            <input
              type="password"
              className="form-control"
              placeholder="Re-type password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <button
              className="btn-btn-dark mt-4 justify-content-center"
              onClick={register}
              style={{
                backgroundColor: "black",
                color: "whitesmoke",
                borderRadius: "6px",
                marginLeft: "35%",
                width:'25%'
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
