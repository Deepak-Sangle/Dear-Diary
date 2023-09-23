import React, { useEffect, useState } from "react";
import '../components/input.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const {BASE_URI} = require('../constant');

  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');

  const login = async () => {
    const res = await axios.post(`${BASE_URI}/login`, {name, password : passcode});
    const data = await res.data;
    console.log(data);
    if(data.success === true){
        navigate('/', {state : data.data});
    }
    else{
        alert(data.message);
    }
    document.getElementById('form').reset();
  }

  function validateSubmit(event){
      event.preventDefault();
      if(name==="") alert("Type something :)");
      login();
  }

  return (
    <div id="nameScreen">
    <div id="name">Dear Diary</div>
    <form id="form" method="POST" onSubmit={validateSubmit}>
        <h3 id="your-name">Login to your account</h3>
        <input id="input-name" value={name} onChange={(e)=> setName(e.target.value.trim())} placeholder="Enter Name" />
        <input id="input-name" type="number" value={passcode} onChange={(e)=> setPasscode(e.target.value.trim())} placeholder="Enter Passcode" />
        <br />
        <div id="submit-div">
            <button id="submit-btn" type="submit">Submit</button>
        </div>
    </form>
  </div>
  );

}
 
export default Login;