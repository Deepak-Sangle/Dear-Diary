import React, { useEffect, useState, useRef } from "react";
import Loading from "../components/loading";
import './home.css'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    const {BASE_URI} = require('../constant');

    const location = useLocation();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [secondLoading, setSecondLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [body, setBody] = useState('');

    const ref = useRef(null);
    const topRef = useRef(null);

    const verify = () => {
        setLoading(true);
      
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URI}/verify-user`)
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    if (!data.success === true) {
                        navigate('/login');
                    }
                    setLoading(false);
                    resolve(data);
                })
                .catch((error) => {
                    setLoading(false);
                    reject(error);
                });
        });
    };

    const setUserName = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URI}/get-user`)
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    if (!data.success === true) {
                        navigate('/login');
                    }
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    const initializeCalls = async () => {
        setUserName()
            .then((resolved) => {
                setName(resolved.data.name);
            })
            .catch((err)=> {
                console.log(err);
                navigate('/login');
            });
            
        verify()
            .then((resolved) => {
                console.log(resolved);
                getAllEvents();
            })
            .catch((err)=> {
                console.log(err);
                navigate('/login');
            })
    }

    useEffect(() => {
        initializeCalls();
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

    function writeDate(){
        const currentDate = new Date(Date.now());
        const today = currentDate.getDate() + '/' + (currentDate.getMonth() + 1).toString() + '/' + currentDate.getFullYear();
        return today;
    }

    const getAllEvents = async () => {
        setSecondLoading(true);
        if(location.state === null){
            setSecondLoading(false);
            return false;
        }
        const res = await axios.get(`${BASE_URI}/get-all-events/${location.state._id}`);
        const data = await res.data;
        if(!data.success === true){
            alert(data.message);
        }
        else{
            setEvents(data.data);
        }
        setSecondLoading(false);
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

    const onSubmitEvent = async (e)=> {
        e.preventDefault();
        const data = document.getElementById('data').value.trim();
        if(data===""){
            alert("Write something :(");
        } 
        else {
            setLoading(true);
            try{
                const res = await axios.post(`${BASE_URI}/add-event`,{body});
                const data = await res.data;
                if(!data.success === true){
                    alert(data.message);
                }
                else{
                    events.unshift(data.data);
                }
            }
            catch(e){
              alert(e.response.data.message);
            }
            setLoading(false);
        }
        document.getElementById('post-data-view').reset();
        setSelectedTab(1);
        setBody("");
    }

    const onSelectedEvent = (index)=> {
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
        const reverseArray = events.slice().reverse();

        return (
            <div id="entries-div">
                {reverseArray.map((entry, index)=> {
                    const date = new Date(entry.createdAt);
                    return (
                        <div onClick={()=> onSelectedEvent(index)} className="entry-box entry-div" key={index}>
                            <h3 className="date entry-date">{date.toLocaleDateString('en-IN')}</h3>
                            <div className="entry-data">{entry.detail}</div>
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
            
            {!loading &&
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
                        <form id="post-data-view" method="POST" onSubmit={onSubmitEvent}>
                            <textarea value={body} onChange={(e)=> setBody(e.target.value)} id="data" className="entry-box" name='data' />
                            <br />
                            <button id="submit-btn" type="submit">   Submit   </button>
                        </form>
                    </div>}
                    {selectedTab===1 && !secondLoading && <div style={{marginLeft: width, marginTop: height}} id="alt-right-view">
                        <div id="get-data-view">
                            <h1 id="entry" className="hello">Your Journal</h1>
                            {events!==undefined && <RenderAllEntries />}
                        </div>
                    </div>}
                    {selectedTab===1 && secondLoading && <Loading />

                    }
                </div>
            }
        </div>
    );
}
export default HomePage;