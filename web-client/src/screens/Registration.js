import React, { useEffect, useState } from "react";
import '../components/input.css'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {

    const navigate = useNavigate();

    const {BASE_URI} = require('../constant');

    const [isAvailable, setIsAvailable] = useState(true);
    const [usersNames, setUsersNames] = useState([]);
    const [name, setName] = useState('');
    const [passcode, setPasscode] = useState('');
    const [cpasscode, setCpasscode] = useState('');

    const saveName = async (name) => {
        try{
            if(passcode !== cpasscode){
                alert("Passwords should be matched");
                return ;
            }
            if(passcode.length < 4) {
                alert("You have to make your password of exactly 4 digit long");
                return ;
            }
            const res = await axios.post(`${BASE_URI}/register`, {name, password : passcode, cpassword : cpasscode});
            const data = await res.data;
            if(data.success === true){
                navigate('/login');
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
        else if(!isAvailable && name!=='')
            saveName(name);
    }

    const getAllNames = async ()=> {
        const res = await axios.get(`${BASE_URI}/getallnames`);
        const data = await res.data;
        setUsersNames(data.data);
    }

    const checkAvailability = () => {
        setIsAvailable(usersNames.includes(name));
    }

    useEffect(()=> {
        getAllNames();
    },[]);

    useEffect(()=>{
        checkAvailability();
        const element2 = document.getElementById('isnotavaliable');
        const element1 = document.getElementById('isavaliable');
        if(name==="" && element1!=null) element1.style.opacity = "0";
        else if(name!=="" && element1!=null) element1.style.opacity = "1";
        if(name==="" && element2!=null) element2.style.opacity = "0";
        else if(name!=="" && element2!=null) element2.style.opacity = "1";
    })
  
    const setPassword = (e) => {
        const val = e.target.value.trim();
        if(val > 9999) return;
        setPasscode(val);
    }

    const setCPassword = (e) => {
        const val = e.target.value.trim();
        if(val > 9999) return;
        setCpasscode(val);
    }

    return (
        <div id="nameScreen">
            <div id="name">Dear Diary</div>
            <form id="form" method="POST" onSubmit={validateSubmit}>
                <h3 id="your-name">Register your account</h3>
                <input 
                    id="input-name" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value.trim())} 
                    placeholder="Enter Name" 
                />
                <br/>
                <input 
                    id="input-name" 
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} 
                    type="number" 
                    value={passcode} 
                    onChange={setPassword} 
                    placeholder="Enter Passcode" 
                />
                <br/>
                <input 
                    id="input-name" 
                    type="number" 
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} 
                    value={cpasscode} 
                    onChange={setCPassword} 
                    placeholder="Confirm Passcode"
                />
                {!isAvailable && <div className="availability" id="isavaliable">{name} is available</div>}
                {isAvailable && <div className="availability" id="isnotavaliable">{name} is not available</div>}
                <div id="submit-div">
                    <button id="input-name" className="submit" type="submit">Register</button>
                </div>
                <br />
                <div id="want-to">
                    Want to Login? <Link id="want-to" to="/login">Click Here</Link>
                </div>

            </form>
        </div>
    );
}

export default Registration;