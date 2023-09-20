import React, { useEffect, useState } from "react";
import '../components/input.css'
import { useNavigate } from "react-router-dom";

const Registration = ({setIsNameExists}) => {

    const navigate = useNavigate();

    const {BASE_URI} = require('../constant');

    const [isAvailable, setIsAvailable] = useState(true);
    const [usersNames, setUsersNames] = useState([]);
    const [name, setName] = useState('');
    const [passcode, setPasscode] = useState('');
    const [cpasscode, setCpasscode] = useState('');

    const saveName = async (name) => {
        const res = await fetch(`${BASE_URI}/register`, {
            method : 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({name, password : passcode, cpassword : cpasscode}),
            credentials : "include"
        });
        const data = await res.json();
        if(data.success === true){
            navigate('/login');
        }
        else{
            alert(data.message);
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
        const res = await fetch(`${BASE_URI}/getallnames`, {
            credentials : "include"
        });
        const data = await res.json();
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
  
    return (
        <div id="nameScreen">
            <div id="name">Dear Diary</div>
            <form id="form" method="POST" onSubmit={validateSubmit}>
                <h3 id="your-name">Register your account</h3>
                <input id="input-name" value={name} onChange={(e)=> setName(e.target.value.trim())} placeholder="Enter Name" />
                <input id="input-name" type="number" value={passcode} onChange={(e)=> setPasscode(e.target.value.trim())} placeholder="Enter Passcode" />
                <input id="input-name" type="number" value={cpasscode} onChange={(e)=> setCpasscode(e.target.value.trim())} placeholder="Confirm Passcode" />
                {!isAvailable && <div className="availability" id="isavaliable">{name} is available</div>}
                {isAvailable && <div className="availability" id="isnotavaliable">{name} is not available</div>}
                <br />
                <div id="submit-div">
                    <button id="submit-btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Registration;