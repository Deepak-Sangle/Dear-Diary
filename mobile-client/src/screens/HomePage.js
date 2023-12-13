import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Animated,
  TouchableOpacity,
  Easing,
  ScrollView,
  ImageBackground,
} from "react-native";
import styles from "../styles/home";

const HomePage = ({ route, navigation }) => {
  const { BASE_URI, PRIMARY_COLOR } = require("../constant");
  const { state } = route.params !== undefined ? route.params : {state : null};

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [secondLoading, setSecondLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [animatedHeights, setAnimatedHeights] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [body, setBody] = useState("");
  
  const verify = () => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      fetch(`${BASE_URI}/verify-user`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.success === true) {
            navigation.navigate("/login");
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
      fetch(`${BASE_URI}/get-user`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.success === true) {
            navigation.navigate("/login");
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const initializeCalls = async () => {
    setUserName()
      .then((resolved) => {
        setName(resolved.data.name);
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate("/login");
      });

    verify()
      .then((resolved) => {
        getAllEvents();
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate("/login");
      });
  };

  useEffect(() => {
    initializeCalls();
  }, []);

  function writeDate() {
    const currentDate = new Date(Date.now());
    const today =
      currentDate.getDate() +
      "/" +
      (currentDate.getMonth() + 1).toString() +
      "/" +
      currentDate.getFullYear();
    return today;
  }

  const getAllEvents = async () => {
    setSecondLoading(true);
    if (state === null) {
      setSecondLoading(false);
      return false;
    }
    const res = await fetch(`${BASE_URI}/get-all-events/${state._id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data.success === true) {
      alert(data.message);
    } else {
      setEvents(data.data);
      setAnimatedHeights(Array.from({ length: data.data.length }, () => (new Animated.Value(0))));
    }
    setSecondLoading(false);
  };

  const onSubmitEvent = async (e) => {
    e.preventDefault();
    const data = body.trim();
    if (data === "") {
      alert("Write something :(");
    } else {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URI}/add-event`, { 
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body : JSON.stringify({detail : body})   
        });
        const data = await res.json();
        if (!data.success === true) {
          alert(data.message);
        } else {
          events.unshift(data.data);
        }
      } catch (e) {
        alert(e.response.data.message);
      }
      setLoading(false);
    }
    setSelectedTab(1);
    setBody("");
  };

  const onSelectedEvent = ( index) => {
    Animated.timing(animatedHeights[index], {
      toValue: 1 - animatedHeights[index]._value,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const RenderAllEntries = () => {
    const reverseArray = events.slice().reverse();

    return (
      <View style={styles.entriesDiv}>
        {reverseArray.map((entry, index) => {
          const date = new Date(entry.createdAt);
          const maxHeight = animatedHeights[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10000],
          });
          return (
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => onSelectedEvent(index)}
              style={{...styles.entryBox}}
              key={index}
            >
              <Text style={{...styles.date, ...styles.entryDate}}>
                {date.toLocaleDateString("en-IN")}
              </Text>
              <Animated.View style={{...styles.entryData, maxHeight}}>
                <Text style={styles.entryText} >
                  {entry.detail}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const changeSelectedIndex = (i) => {
    setSelectedTab(i);
  };

  return (
    <View style={{flex : 1}}>
       
       <View style={styles.container}>
        <ScrollView style={styles.container}>
          {selectedTab===0 && <View style={styles.rightView}>
              <Text style={styles.hello}>Hello {name}</Text>
              <Text style={styles.date}>Today's date : {writeDate()}</Text>
              <View style={styles.postDataView} >
                  <TextInput 
                    multiline 
                    value={body} 
                    numberOfLines={65}
                    onChangeText={setBody} 
                    textAlignVertical="top"
                    style={{...styles.data, ...styles.entryBox}} 
                  />
                  <Button onPress={onSubmitEvent} color={PRIMARY_COLOR} title="Submit" />
              </View>
          </View>}
          {selectedTab===1 && !secondLoading && <View style={styles.rightView}>
              <View>
                  <Text style={{...styles.entry, ...styles.hello}}>Your Journal</Text>
                  {events!==undefined && <RenderAllEntries />}
              </View>
          </View>}


        </ScrollView>
        
        <View style={styles.mobileTopView}>
           <TouchableOpacity onPressOut={() => changeSelectedIndex(0)}>
             <ImageBackground resizeMode="contain" source={require('../../assets/images/read.png')} style={styles.logo}></ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity onPressOut={() => changeSelectedIndex(1)}>
             <ImageBackground resizeMode="contain" source={require('../../assets/images/write.png')} style={styles.logo}></ImageBackground>
           </TouchableOpacity>
         </View>
      </View>
  </View>
  );
};
export default HomePage;
