// simple react native component

import React, { Component, useState, useRef } from 'react';
import { Linking, View, Text, StyleSheet, TextInput, Button, TouchableHighlight, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import styles from '../styles/login';

export default function Login() {

  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState(['','','','']);
  const [new_styles, setNewStyles] = useState({});

  const passcodeRefs = Array.from({ length: 4 }, () => useRef(null));

  const login = async () => {
    try{
      const res = await axios.post(`${BASE_URI}/login`, {name, password : passcode.join('')});
      const data = await res.data;
      if(data.success === true){
          navigate('/', {state : data.data});
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
      if(name==="") {
        alert("Enter valid username");
        return;
      }
      else if(passcode.join('').length !== 4) {
        alert("Enter exactly 4 digit password");
        return;
      }
      setNewStyles({
        backgroundColor: "#2d2d2d",
        color: "white"
      });
      console.log(name, passcode.join(''));
      // login();
  }

  const setCorrectPasscode = (text, i) => {
    if(text.length > 1) return;
    const acceptedKeys = ['','0','1','2','3','4','5','6','7','8','9'];
    if(!acceptedKeys.includes(text)) return;
    if(text.length === 1 && i<3) {
      passcodeRefs[i+1].current.focus();
    }
    const new_passcode = [...passcode];
    new_passcode[i] = text;
    setPasscode(new_passcode);
  }

  const onPressedKey = (e, i) => {
    if(e.nativeEvent.key === 'Backspace' && passcode[i] === '' && i>0) {
      passcodeRefs[i-1].current.focus();
    }
    if(e.nativeEvent.key === 'Enter') {
      validateSubmit(e.nativeEvent);
    }
  }

  return(
    <ScrollView >
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.nameScreen}>
        <Text style={styles.name}>Dear Diary</Text>
        <View>
          
          <Text style={styles.yourName}>
            Login to your account
          </Text>

          <TextInput style={styles.inputName} value={name} onChangeText={setName} placeholder="Enter Username" />
          <Text style={styles.yourName}>Enter Password</Text>
          <View style={styles.passcodeView}>

            {[0,1,2,3].map((i)=> {
              return(
                <TextInput 
                  key={i} 
                  ref={passcodeRefs[i]}
                  style={{...styles.inputName, ...styles.passcodeBox}} 
                  value={passcode[i]} 
                  inputMode='numeric'
                  onKeyPress={(e) => onPressedKey(e,i)} 
                  onChangeText={(text) => setCorrectPasscode(text, i)} 
                />
              )
            })}
          </View>
          <TouchableOpacity>
            <View style={{margin : 20,}}>
              {/* <Text onPress={validateSubmit} style={{...styles.submit, ...styles.inputName, ...new_styles}}  type="submit" >Enter</Text> */}
              <Button title='Enter' onPress={validateSubmit} color="#2d2d2d"></Button>
            </View>
          </TouchableOpacity>
          <View style={styles.passcodeView}>
            <Text style={styles.wantTo}>Want to Register? </Text> 
            <Text onPress={() => Linking.openURL("/register")} style={{...styles.wantTo, ...styles.wantToA}}>
              Click Here
            </Text>
          </View>

        </View>
      </ImageBackground>
    </ScrollView>
  )
}