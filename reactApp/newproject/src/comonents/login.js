import React, { useState, useEffect } from "react";
import axios from 'axios';

import HomePage from './homePage';


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
  }

  // email Change Handler function
  function emailChangeHandler (event){
    setEmail(event.target.value);
  };

  // Passwrod Change Handler function
  const passwordChangeHandler = event=>{
    setPassword(event.target.value)
  }

  function formSubmissionHandler(event){
    event.preventDefault();
    const body = {email: email, password: password}
    axios.post('http://localhost:5000/user/login', body).then(response=>{
      console.log("Respons: ", response);
      if(response.status == 200){
        props = response.data;
      }
    }).catch(err=>{
      console.log("Something wen wrong");
    })

  }

 

  return (
    <div>

      <form onSubmit={formSubmissionHandler}>
        <h1>Login Form</h1>
        <label>
          Email:
          <input type="email" id="email" name="email" onChange={emailChangeHandler}/>
        </label>
        <label>
          Password:
          <input type="password" id="password" name="password"  onChange={passwordChangeHandler}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <HomePage data={props}/>
    </div>
  );
}