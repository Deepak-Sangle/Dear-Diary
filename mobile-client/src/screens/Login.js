import React, { Component, useState, useRef } from 'react';
import { Linking, View, Text, StyleSheet, ActivityIndicator, TextInput, Button, TouchableHighlight, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import styles from '../styles/login';

const Login = ({navigation}) => {

  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState(['','','','']);
  const [loading, setLoading] = useState(false);

  const {BASE_URI, PRIMARY_COLOR} = require('../constant.js');

  const passcodeRefs = Array.from({ length: 4 }, () => useRef(null));

  const login = async () => {
    try{
      setLoading(true);
      const res = await fetch(`${BASE_URI}/login`, {
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
          name, 
          password : passcode.join('')
        })
      });
      const data = await res.json();
      setLoading(false);
      if(data.success === true){
        navigation.navigate('/', {state : data.data});
      }
      else{
        alert(data.message);
      }
    }
    catch(e){
      alert(e.response.data.message);
      setLoading(false);
    }
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
      login();
  }

  const setCorrectPasscode = (text, i) => {
    let index = 0;
    console.log({text, i});
    const new_passcode = [...passcode];
    if(text.length === 0) {
      new_passcode[i] = '';
      setPasscode(new_passcode);
      return;
    }
    while(text.length > index) {
      const acceptedKeys = ['','0','1','2','3','4','5','6','7','8','9'];
      if(!acceptedKeys.includes(text[index])) return;
      new_passcode[i] = text[index];
      if(i<3) {
        passcodeRefs[i+1].current.focus();
      }
      else break;
      i++;
      index++;
    }
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
          
          <Text style={{...styles.yourName, marginBottom : 30, fontSize : 25}}>
            Login to your account
          </Text>

          <Text style={styles.yourName}>Enter Username</Text>
          <TextInput style={styles.inputName} value={name} onChangeText={(text) => setName(text.trim())} />
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
              <Button title='Enter' onPress={validateSubmit} color={PRIMARY_COLOR}></Button>
            </View>
          </TouchableOpacity>
          <View style={styles.passcodeView}>
            <Text style={styles.wantTo}>Want to Register? </Text> 
            <TouchableOpacity onPress={() => navigation.navigate("/register")} >
              <Text style={{...styles.wantTo, ...styles.wantToA}}>
                Click Here
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
      {loading && <View style={styles.loadingView}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>}
    </ScrollView>
  )
}

export default Login;