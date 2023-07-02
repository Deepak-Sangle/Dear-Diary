import React, { useEffect, useState, useRef } from "react";
import InputText from "../components/inputText";
import Loading from "../components/loading";
import './home.css';

const HomePage = () => {

    const {BASE_URI} = require('../constant');

    const [loading, setLoading] = useState(true);
    const [isNameExists, setIsNameExists] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState([]);
    const [user, setUser] = useState();
    const [selectedTab, setSelectedTab] = useState(0);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [body, setBody] = useState('');

    const ref = useRef(null);
    const topRef = useRef(null);


    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
  
    useEffect(()=>{
        changetoMobileView();
    })

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

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

    const getUserData = async () => {
        const res = await fetch(`${BASE_URI}/getdata`, {
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        });
        const data = await res.json();
        setUser((data.user)[0]);
    }

    const changetoMobileView = ()=> {
        if(ref.current!=null)
            setWidth(ref.current.offsetWidth);
        if(topRef.current!=null)
            setHeight(topRef.current.offsetHeight);
    }

    useEffect(()=>{
        changetoMobileView();
    },[windowSize])

    useEffect(()=>{
        getDate();
        getUserData();
    },[name])

    function verifyEntry(){
        const length = user.entry.length;
        if(length===0) return true ;
        const lastDate = user.entry[length-1].date.slice();
        getDate();
        for(var i=0;i<3;i++){
            if(lastDate[i]!==date[i]) return true;
        }
        return false;
    }

    const entrySubmitted = async (e)=> {
        e.preventDefault();
        const data = document.getElementById('data').value.trim();
        if(data===""){
            alert("Write something :)");
        } 
        else if(verifyEntry()){
            const res = await fetch(`${BASE_URI}/addentry`, {
                method : "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, date, data})
            });
            getUserData();
        }
        else{
            alert("Entry already added");
        }
        document.getElementById('post-data-view').reset();
        setSelectedTab(1);
        setBody("");
    }

    const onSelectedEntry = (index)=> {
        const data = document.getElementsByClassName('entry-data')[index];
        console.log(data.style.maxHeight);
        if(data.style.maxHeight === "15em"){
            data.style.maxHeight = "30em";
            data.style.overflowY = "scroll";
        }
        else{
            data.style.maxHeight = "15em";
            data.style.overflowY = "hidden";
        }
    }

    const RenderAllEntries = ()=> {
        const reverseArray = user.entry.slice().reverse();

        return (
            <div id="entries-div">
                {reverseArray.map((entry, index)=> {
                    return (
                        <div onClick={()=> onSelectedEntry(index)} className="entry-box entry-div" key={index}>
                            <h3 className="date entry-date">{(entry.date)[0]+'/'+(entry.date)[1]+'/'+(entry.date)[2]}</h3>
                            <div className="entry-data">{entry.data}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const changeSelectedIndex = (i)=> {
        setSelectedTab(i);
    }

    return (
        <div>
            {loading && <Loading />}
            {!loading && !isNameExists && 
                <InputText setIsNameExists={setIsNameExists} />
            }
            {!loading && isNameExists && 
                <div id="container">
                    <div ref={topRef} id="mobile-top-view" className="left-view">
                        <div onClick={()=> changeSelectedIndex(0)} className="logo-btn"><div className="mobile-logo logo writelogo"></div></div>
                        <div onClick={()=> changeSelectedIndex(1)} className="logo-btn"><div className="mobile-logo logo"></div></div>
                    </div>
                    <div ref={ref} className="left-view">
                        <div onClick={()=> changeSelectedIndex(0)} className="logo-btn"><div className="logo writelogo"></div></div>
                        <div onClick={()=> changeSelectedIndex(1)} className="logo-btn"><div className="logo"></div></div>
                    </div>
                    {selectedTab===0 && <div style={{marginLeft: width, marginTop: height}} id="right-view">
                        <div className="hello">Hello {name}</div>
                        <div className="date">Today's date : {writeDate()}</div>
                        <form id="post-data-view" method="POST" onSubmit={entrySubmitted}>
                            <textarea value={body} onChange={(e)=> setBody(e.target.value)} id="data" className="entry-box" name='data' />
                            <br />
                            <button id="submit-btn" type="submit">   Submit   </button>
                        </form>
                    </div>}
                    {selectedTab===1 && <div style={{marginLeft: width, marginTop: height}} id="alt-right-view">
                        <div id="get-data-view">
                            <h1 id="entry" className="hello">Your Journal</h1>
                            {user!==undefined && <RenderAllEntries />}
                        </div>
                    </div>}
                </div>
            }
        </div>
    );
}
export default HomePage;