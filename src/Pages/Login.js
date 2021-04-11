import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {
        "email": email,
        "password": password
    }
    const token = await axios({
      method: 'POST',
      url: `https://reqres.in/api/login`,
      data: user
    });
    // console.log(token);
    setToken(token.data);
  }
  

  return(
    <div className="container" style={{marginTop: "10vh", display : "flex", flexDirection : "column", justifyContent: "center", alignItems : "center"}}>
        <h1>Please Login</h1>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"></input>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};