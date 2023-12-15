import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import styles from "../styles/login";

const Registration = ({ navigation }) => {
  const { BASE_URI, PRIMARY_COLOR } = require("../constant.js");

  const availableRef = useRef(null);
  const notAvailableRef = useRef(null);

  const [isAvailable, setIsAvailable] = useState(true);
  const [usersNames, setUsersNames] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [cpasscode, setCpasscode] = useState("");
  
  const saveName = async () => {
    try {
      if (passcode !== cpasscode) {
        alert("Passwords should be matched");
        return;
      }
      if (passcode.length < 4) {
        alert("You have to make your password of exactly 4 digit long");
        return;
      }
      setLoading(true);
      const res = await fetch(`${BASE_URI}/register`, {
        method: "POST",
        credentials : 'include',
        headers : {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          name,
          password: passcode,
          cpassword: cpasscode,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === true) {
        navigation.navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (e) {
      setLoading(false);
      alert(e.response.data.message);
    }
  };

  function validateSubmit(event) {
    event.preventDefault();
    if (name === "") {
      alert("Type something :)");
      return;
    } else if (isAvailable && name !== "") {
      saveName();
    } else if (!isAvailable) {
      alert("Username is not available");
      return;
    }
  }

  const getAllNames = async () => {
    try {
      const res = await fetch(`${BASE_URI}/getallnames`, {
        method: "GET",
        credentials : 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUsersNames(data.data);
      console.log(data.data);
    } catch (e) { 
      console.log("error getting names: ", e);
      alert("Something went wrong");
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
      zero: {
        opacity: 0,
      },
      one: {
        opacity: 1,
      },
    };
    const isLoading = usersNames.length === 0;
    if(isLoading){
      availableRef.current?.setNativeProps({ style: style.zero });
      notAvailableRef.current?.setNativeProps({ style: style.zero });
      return ;
    }
    if (name === "" && availableRef.current != null)
      availableRef.current.setNativeProps({ style: style.zero });
    else if (name !== "" && availableRef.current != null)
      availableRef.current.setNativeProps({ style: style.one });
    if (name === "" && notAvailableRef.current != null)
      notAvailableRef.current.setNativeProps({ style: style.zero });
    else if (name !== "" && notAvailableRef.current != null)
      notAvailableRef.current.setNativeProps({ style: style.one });
  });

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.nameScreen}
      >
        <Text style={styles.name}>Dear Diary</Text>
        <View>
          <Text style={styles.yourName}>Register your account</Text>

          <TextInput
            style={styles.inputName}
            value={name}
            placeholderTextColor={PRIMARY_COLOR}
            onChangeText={(text) => setName(text.trim())}
            placeholder="Enter Username"
          />
          {isAvailable && (
            <Text ref={availableRef} style={styles.availability}>
              {name} is available
            </Text>
          )}
          {!isAvailable && (
            <Text
              ref={notAvailableRef}
              style={{ ...styles.availability, ...styles.isnotavaliable }}
            >
              {name} is not available
            </Text>
          )}

          <TextInput
            style={styles.inputName}
            placeholderTextColor={PRIMARY_COLOR}
            inputMode='numeric'
            value={passcode}
            maxLength={4}
            onChangeText={setPasscode}
            placeholder="Enter Passcode"
          />
          <TextInput
            style={styles.inputName}
            inputMode='numeric'
            placeholderTextColor={PRIMARY_COLOR}
            maxLength={4}
            value={cpasscode}
            onChangeText={setCpasscode}
            placeholder="Confirm Passcode"
          />

          <View style={{ margin: 20 }}>
            <Button
              title="Register"
              titleStyle={{color : "#1f1f1f"}}
              onPress={validateSubmit}
              color={PRIMARY_COLOR}
            ></Button>
          </View>

          <View style={styles.passcodeView}>
            <Text style={styles.wantTo}>Want to Login? </Text>
            <TouchableOpacity 
              onPressOut={() => navigation.navigate("/login")}
            >
              <Text
                style={{ ...styles.wantTo, ...styles.wantToA }}
              >
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
  );
};

export default Registration;
