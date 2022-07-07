import React, { useEffect, useState } from "react";
import './input.css';

const InputText = ({setIsNameExists}) => {

    const [isAvailable, setIsAvailable] = useState(true);
    const [usersNames, setUsersNames] = useState([]);
    const [name, setName] = useState('');

    const saveName = async (name) => {
        const res = await fetch('savename', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        });
        if(res.ok){
            localStorage.setItem('name', name);
            setIsNameExists(true);
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
        var allNames = [];
        const res = await fetch('/getallnames');
        const data = await res.json();
        data.User.map((user)=> {
            allNames.push(user.name);
        });
        setUsersNames(allNames);
        checkAvailability();
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
            <div id="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti error impedit quis </div>
            <form id="form" method="POST" onSubmit={validateSubmit}>
                <h3 id="your-name">Enter your name</h3>
                <input id="input-name" value={name} onChange={(e)=> setName(e.target.value.trim())} placeholder="" />
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

export default InputText;