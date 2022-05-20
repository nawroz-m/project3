import React, { useState } from "react";
import axios from 'axios';

import HomePage from './homePage';

export default function SignUP(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [role, setRole] = useState("");

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

  // name change handler function
  function nameChangeHandler (event){
    setName(event.target.value);
  };

 // role change handler function
 function roleChangeHandler (event){
  setRole(event.target.value);
};

  // Passwrod Change Handler function
  const passwordChangeHandler = event=>{
    setPassword(event.target.value)
  }

  function formSubmissionHandler(event){
    event.preventDefault();
    const body = {name: name, email: email, password: password, role: role}
    axios.post('http://localhost:5000/user/signup', body).then(response=>{
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
        <h1>Sign UP Form</h1>
        <label>
          Name:
          <input type="text" id="name" name="name" onChange={nameChangeHandler}/>
        </label>

        <label>
          Role:
          <input type="text" id="role" name="role" onChange={roleChangeHandler}/>
        </label>

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