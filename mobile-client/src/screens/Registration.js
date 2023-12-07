import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import styles from "../styles/login";
// import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  // const navigate = useNavigate();

  const {BASE_URI} = require('../constant.js');
  const availableRef = useRef(null);
  const notAvailableRef = useRef(null);

  const [isAvailable, setIsAvailable] = useState(true);
  const [usersNames, setUsersNames] = useState([]);
  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [cpasscode, setCpasscode] = useState("");

  // const saveName = async (name) => {
  //   try {
  //     if (passcode !== cpasscode) {
  //       alert("Passwords should be matched");
  //       return;
  //     }
  //     if (passcode.length < 4) {
  //       alert("You have to make your password of exactly 4 digit long");
  //       return;
  //     }
  //     const res = await axios.post(`${BASE_URI}/register`, {
  //       name,
  //       password: passcode,
  //       cpassword: cpasscode,
  //     });
  //     const data = await res.data;
  //     if (data.success === true) {
  //       navigate("/login");
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (e) {
  //     alert(e.response.data.message);
  //   }
  //   document.getElementById("form").reset();
  // };

  function validateSubmit(event) {
    event.preventDefault();
    if (name === "") {
      alert("Type something :)");
      return;
    } else if (isAvailable && name !== "") {
      // saveName(name);
    }
  }

  const getAllNames = async () => {
    try{
      const res = await fetch(`${BASE_URI}/getallnames`, {
        method : 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const data = await res.json();
      setUsersNames(data.data);
      console.log(data.data);
    }
    catch(e){
      console.log("error getting names: ", e);
    }
  };

  const checkAvailability = () => {
    setIsAvailable(!usersNames.includes(name));
  };

  useEffect(() => {
    getAllNames();
  }, []);

  useEffect(() => {
    checkAvailability();
    const style = {
      zero : {
        opacity : 0
      },
      one : {
        opacity : 1
      }
    }
    if (name === "" && availableRef.current != null) availableRef.current.setNativeProps({style : style.zero});
    else if (name !== "" && availableRef.current != null) availableRef.current.setNativeProps({style : style.one});
    if (name === "" && notAvailableRef.current != null) notAvailableRef.current.setNativeProps({style : style.zero});
    else if (name !== "" && notAvailableRef.current != null) notAvailableRef.current.setNativeProps({style : style.one});
  });

  const setPassword = (text) => {
    if (text.length > 4) return;
    setPasscode(text);
  };

  const setCPassword = (text) => {
    if (text.length > 4) return;
    setCpasscode(text);
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.nameScreen}
      >
        <View style={styles.nameScreen}>
          <Text style={styles.name}>Dear Diary</Text>
          <View>
            
            <Text style={styles.yourName}>
              Register your account
            </Text>

            <TextInput 
              style={styles.inputName} 
              value={name} 
              onChangeText={setName} 
              placeholder="Enter Username" 
            />

            <TextInput
              style={styles.inputName}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              type="number"
              value={passcode}
              onChangeText={setPassword}
              placeholder="Enter Passcode"
            />
            <TextInput
              style={styles.inputName}
              type="number"
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              value={cpasscode}
              onChangeText={setCPassword}
              placeholder="Confirm Passcode"
            />
            {isAvailable && (
              <Text ref={availableRef} style={styles.availability}>
                {name} is available
              </Text>
            )}
            {!isAvailable && (
              <Text ref={notAvailableRef} style={{...styles.availability, ...styles.isnotavaliable}}>
                {name} is not available
              </Text>
            )}

            <TouchableOpacity>
              <View style={{margin : 20,}}>
                <Button title='Register' onPress={validateSubmit} color="#2d2d2d"></Button>
              </View>
            </TouchableOpacity>

            <View style={styles.passcodeView}>
              <Text style={styles.wantTo}>Want to Login? </Text> 
              <Text onPress={() => Linking.openURL("/login")} style={{...styles.wantTo, ...styles.wantToA}}>
                Click Here
              </Text>
            </View>

          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Registration;
