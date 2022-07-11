import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import CustomButtons from "./customButtons";
import { BASE_URI } from "../constants/projectConstants";

const InputName = ({setIsNameExists}) => {

    const [isAvailable, setIsAvailable] = useState(true);
    const [usersNames, setUsersNames] = useState([]);
    const [name, setName] = useState('');

    const saveName = async (name) => {
        try{
            const res = await fetch(`http://localhost:5000/savename`, {
                method : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name})
            });
            if(res.ok){
                localStorage.setItem('name', name);
                setIsNameExists(true);
            }
        } catch (error) {
            console.log(error);
        }
        setName("");
    }

    function validateSubmit(){
        if(name==="") alert("Type something :)");
        else if(!isAvailable && name!=='')
            saveName(name);
        
    }

    const getAllNames = async ()=> {
        var allNames = [];
        try {
            const res = await fetch(`http://localhost:5000/getallnames`);
            const data = await res.json();
            data.User.map((user)=> {
                allNames.push(user.name);
            });
            console.log(allNames);
            setUsersNames(allNames);
            checkAvailability();
        } catch (error) {
            console.log(error);
        }
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
        <View style={styles.nameScreen}>
            <Text style={styles.name}>Dear Diary</Text>
            <Text style={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti error impedit quis </Text>
            <Text style={styles.yourName}>Enter your name</Text>
            <TextInput style={styles.inputName} value={name} onChangeText={setName} placeholder="" />
            {!isAvailable && <Text style={[styles.availability, styles.isavaliable, {opacity : name!=="" ? 1 : 0} ]}>{name} is available </Text>}
            {isAvailable &&  <Text style={[styles.availability, styles.isnotavaliable, {opacity : name!=="" ? 1 : 0}]}>{name} is not available</Text>}
            <CustomButtons width="80" text="SUBMIT" isDone={true} pressHandler={validateSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    nameScreen : {
        marginTop: 20,
        padding: 30,
        justifyContent : "center",
        alignItems : "center",
    },
    name : {
        textAlign : "center",
        fontSize: 30,
        fontFamily: 'Nunito-Bold',
    },
    description : {
        fontFamily: 'Nunito-Regular',
        margin: 15,
    },
    yourName : {
        fontFamily: "Nunito-Medium",
        marginTop: 30,
    },
    inputName : {
        marginVertical : 10,
        width : "100%",
        padding: 5,
        borderRadius: 100,
        borderWidth : 2,
        borderColor : "black",
        paddingLeft: 20,
    },
    availability : {
        fontFamily: "Nunito-Regular",
        marginVertical : 10,
        letterSpacing : 0.5,
    },
    isnotavaliable : {
        color : "red",
    },
});

export default InputName;