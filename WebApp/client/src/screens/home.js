import React, { useEffect, useState } from "react";
import InputText from "../components/inputText";
import Loading from "../components/loading";

const HomePage = () => {

    const [loading, setLoading] = useState(true);
    const [isNameExists, setIsNameExists] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState([]);
    const [user, setUser] = useState();
    
    useEffect(()=>{
        setLoading(false);
        const name = localStorage.getItem('name');
        if(name) {
            setIsNameExists(true);
            setName(name);
        }
    }, [isNameExists]);

    function writeDate(){
        const today = date[0] + '/' + date[1] + '/' + date[2];
        return today;
    }

    function getDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        const newDate = [parseInt(dd),parseInt(mm),parseInt(yyyy)];
        setDate(newDate);
    }

    async function getUserData(){
        const res = await fetch('getdata', {
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        });
        const data = await res.json();
        setUser((data.user)[0]);
    }

    useEffect(()=>{
        getDate();
        getUserData();
    },[name])

    function verifyEntry(){
        const length = user.entry.length;
        if(length==0) return true ;
        const lastDate = user.entry[length-1].date.slice();
        for(var i=0;i<3;i++){
            if(lastDate[i]!=date[i]) return true;
        }
        return false;
    }

    const entrySubmitted = async (e)=> {
        e.preventDefault();
        const data = document.getElementById('data').value.trim();
        if(data==""){
            alert("Write something :)");
        } 
        else if(verifyEntry()){
            const res = await fetch('addentry', {
                method : "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, date, data})
            });
            getUserData();
        }
        else{
            alert("Entry already added");
        }
        document.getElementById('entry-form').reset();
    }

    const RenderAllEntries = ()=> {
        return (
            <div>
                {user.entry.map((entry, index)=> {
                    return (
                        <div key={index}>
                            <h3>{(entry.date)[0]+'/'+(entry.date)[1]+'/'+(entry.date)[2]}</h3>
                            <p>{entry.data}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            {loading && <Loading />}
            {!loading && !isNameExists && 
                <InputText setIsNameExists={setIsNameExists} />
            }
            {!loading && isNameExists && 
                <div>
                    <div>Hello {name}</div>
                    <div>Today's date : {writeDate()}</div>
                    <form id="entry-form" method="POST" onSubmit={entrySubmitted}>
                        <textarea id="data" name='data' />
                        <button type="submit">Submit</button>
                    </form>
                    <div>
                        <h1>Your all entries</h1>
                        {user!=undefined && <RenderAllEntries />}
                    </div>
                </div>
            }
        </div>
    );
}

export default HomePage;