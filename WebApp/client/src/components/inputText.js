import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InputText = ({setIsNameExists}) => {

    let navigate = useNavigate();
    const [isAvailable, setIsAvailable] = useState(true);
    const [usersNames, setUsersNames] = useState([]);
    const [name, setName] = useState('');

    const saveName = async (name) => {
        const res = await fetch('savename', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        });
        const data = await res.json();
        if(res.ok){
            localStorage.setItem('name', name);
            setIsNameExists(true);
        }
        document.getElementById('form').reset();
    }

    function validateSubmit(event){
        event.preventDefault();
        if(name=="") alert("Type something :)");
        else if(!isAvailable && name!='')
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
    })

    return (
        <div>
            <form id="form" method="POST" onSubmit={validateSubmit}>
                <h3>Your name</h3>
                <input value={name} onChange={(e)=> setName(e.target.value.trim())} placeholder="Name..." />
                <button type="submit">Submit</button>
            </form>
            
            {name!=='' && !isAvailable && <div>{name} is available</div>}
            {name!=='' && isAvailable && <div>{name} is not available</div>}
        </div>
    );
}

export default InputText;