import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const CustomButtons = props => {
  const text = props.text;
  const isDone = props.isDone;
  const margin = props.margin ? props.margin : 20;
  const icon = props.icon;
  const left = props.left;
  const right = props.right;
  const radius = props.radius ? props.radius : 7;
  const borderColor = props.borderColor;
  const showLoader = props.showLoader!=undefined ? props.showLoader : false;
  
  const primary_color = isDone ? '#0078E9' : '#FFFFFF';
  const secondary_color = isDone ? '#FFFFFF' : '#0078E9';
  const pressHandler = props.pressHandler;
  const width = props.width ? props.width + '%' : '100%';
  const isArrow = props.isArrow ? props.isArrow : false;
  const backbgcolor = {
    backgroundColor: primary_color,
    width: width,
    borderColor: secondary_color,
    borderRadius: radius,
  };

  const textcolor = {
    color: secondary_color,
    margin: margin,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.btn, backbgcolor, borderColor!=undefined ? {borderColor : borderColor} : {}]}
      onPress={pressHandler}>
      {left && icon}
      <Text style={[styles.btntext_2, textcolor]}>
        {!showLoader && <Text>{text}</Text>}
        {showLoader && <ActivityIndicator size={20} animating={true} color={secondary_color} />}
      </Text>
      {right && icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
    borderWidth: 1,
    justifyContent: 'center',
  },
  btntext_2: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  arrow: {
    margin: 10,
  },
});
export default CustomButtons;
