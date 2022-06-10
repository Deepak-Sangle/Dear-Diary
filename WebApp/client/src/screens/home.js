import React, { useEffect, useState } from "react";
import InputText from "../components/inputText";
import Loading from "../components/loading";

const HomePage = () => {

    const [loading, setLoading] = useState(true);
    const [isNameExists, setIsNameExists] = useState(false);
    const [name, setName] = useState('');

    useEffect(()=>{
        setLoading(false);
        const name = localStorage.getItem('name');
        if(name) {
            setIsNameExists(true);
            setName(name);
        }
    }, [isNameExists]);

    return (
        <div>
            {loading && <Loading />}
            {!loading && !isNameExists && 
                <InputText setIsNameExists={setIsNameExists} />
            }
            {!loading && isNameExists && 
                <div>Hello {name}</div>
            }
        </div>
    );
}

export default HomePage;