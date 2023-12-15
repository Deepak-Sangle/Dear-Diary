import React, { Component, useState, useRef, useEffect } from 'react';
import { Linking, View, Text, StyleSheet, ActivityIndicator, TextInput, Button, TouchableHighlight, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/login';

const Login = ({navigation}) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameStored, setNameStored] = useState(false);
  const [index, setIndex] = useState(0);

  const {BASE_URI, PRIMARY_COLOR} = require('../constant.js');

  const passcodeRefs = Array.from({ length: 4 }, () => useRef(null));
  const passwordRef = useRef(null);

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
          password 
        })
      });
      const data = await res.json();
      if(data.success === true){
        await AsyncStorage.setItem('name', name);
        setLoading(false);
        navigation.navigate('/', {state : data.data});
      }
      else{
        setLoading(false);
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
      console.log({name, password, index});
      if(name==="") {
        alert("Enter valid username");
        return;
      }
      else if(password.length !== 4) {
        alert("Enter exactly 4 digit password");
        return;
      }
      login();
  }

  const findAsyncName = async ()=> {
    try{
      setLoading(true);
      const storedName = await AsyncStorage.getItem('name');
      if(storedName === null){
        setNameStored(false);
      }
      else{
        setNameStored(true);
        setName(storedName);
      }
      setLoading(false);
    } catch(e){
      console.log(e);
      setLoading(false);
      alert("Something went wrong");
      return ;
    }
  }

  useEffect(()=> {
    findAsyncName();
  }, [])

  const changePasscodeView = (e) => {
    console.log(e.nativeEvent.key);
    if(e.nativeEvent.key === 'Backspace'){
      if(index === 0) return;
      passcodeRefs[index-1].current.setNativeProps({
        style : {
          backgroundColor : 'transparent'
        }
      })
      setPassword(password.slice(0, -1));
      if(index > 0) setIndex(index-1);
    }
    else if(e.nativeEvent.key === 'Enter'){
      validateSubmit(e);
    }
    else if(e.nativeEvent.key >= 0 && e.nativeEvent.key <= 9){
      if(index === 4) return;
      passcodeRefs[index].current.setNativeProps({
        style : {
          backgroundColor : PRIMARY_COLOR
        }
      });
      if(password.length < 4) setPassword(password + e.nativeEvent.key);
      if(index <= 3) setIndex(index+1);
    }
  }

  const openKeyboard = () => {
    console.log("open keyboard");
    passwordRef.current.focus();
  }

  const moveNext = (e) => {
    if(e.nativeEvent.key === 'Enter'){
      openKeyboard();
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

          {!nameStored && <View>
            <Text style={styles.yourName}>Enter Username</Text>
            <TextInput style={styles.inputName} blurOnSubmit={false} onKeyPress={moveNext} value={name} onChangeText={(text) => setName(text.trim())} />
          </View>}
          {nameStored && <View>
            <Text style={styles.yourName}>Welcome Back!</Text>
            <TextInput style={styles.inputName} value={name} editable={false} />
          </View>}

          <Text style={styles.yourName}>Enter Password</Text>

          {!nameStored && <View style={styles.passcodeView}>
            {[0,1,2,3].map((i)=> {
              return(
                <TouchableOpacity activeOpacity={0.5} ref={passcodeRefs[i]} onPress={openKeyboard} key={i} style={styles.passcodeDot}></TouchableOpacity>
              )
            })}

            <TextInput
              style={{display : "none"}}
              placeholderTextColor={PRIMARY_COLOR}
              inputMode='numeric'
              value={password}
              maxLength={4}
              ref={passwordRef}
              autoFocus={true}
              onKeyPress={changePasscodeView}
            />

          </View>}

          {nameStored && <TextInput
            style={styles.inputName}
            placeholderTextColor={PRIMARY_COLOR}
            inputMode='numeric'
            value={password}
            maxLength={4}
            onChangeText={setPassword}
          />}

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