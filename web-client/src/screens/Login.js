import React, { useEffect, useState } from "react";
import '../components/input.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const {BASE_URI} = require('../constant');

  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState(['','','','']);

  const login = async () => {
    try{
      const res = await axios.post(`${BASE_URI}/login`, {name, password : passcode.join('')});
      const data = await res.data;
      if(data.success === true){
          navigate('/', {state : data.data});
      }
      else{
          alert(data.message);
      }
    }
    catch(e){
      alert(e.response.data.message);
    }
    document.getElementById('form').reset();
  }

  function validateSubmit(event){
      event.preventDefault();
      if(name==="") alert("Type something :)");
      login();
  }

  const setCorrectPasscode = (e, i) => {
    var digit;
    if(e.target.value !== '')
      digit = parseInt(e.target.value.trim());
    else 
      digit = '';
    if(digit !== '' && (digit > 9 || digit < 0)) return;
    if(digit !== '' && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
    const new_passcode = [...passcode];
    new_passcode[i] = digit;
    setPasscode(new_passcode);
  }

  const onPressedKey = (e) => {
    if(["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
      return;
    }
    if(e.key === 'Backspace' && e.target.value === '') {
      if(e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      }
    }
  }

  return (
    <div id="nameScreen">
      <div id="name">Dear Diary</div>
      <form id="form" method="POST" onSubmit={validateSubmit}>
          <h3 id="your-name">Login to your account</h3>
          <input id="input-name" value={name} onChange={(e)=> setName(e.target.value.trim())} placeholder="Enter Username" />
          <br />
          <h3 id="your-name">Enter Password</h3>
          {[0,1,2,3].map((i)=> {
            return(
              <input 
                key={i} 
                id="input-name" 
                className="passcode-box" 
                value={passcode[i]} 
                onKeyDown={(e) => onPressedKey(e)} 
                type="number" 
                onChange={(e) => setCorrectPasscode(e, i)} 
              />
            )
          })}
          {/* <input id="input-name" type="number" value={passcode} onChange={(e)=> setPasscode(e.target.value.trim())} placeholder="Enter Passcode" /> */}
          <div id="submit-div">
              <button id="input-name" className="submit" type="submit">Enter</button>
          </div>
          <br />
          <div id="want-to">
            Want to Register? <Link id="want-to" to="/register">Click Here</Link>
          </div>
      </form>
    </div>
  );

}
 
export default Login;