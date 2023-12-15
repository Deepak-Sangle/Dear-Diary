import { StyleSheet, Dimensions } from "react-native";

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = require('../constant.js');
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  nameScreen: {
    padding: 20,
    height : HEIGHT,
    textAlign: "center",
  },
  name: {
    textAlign : "center",
    fontSize: 50,
    color : PRIMARY_COLOR,
    margin: 30,
    marginTop: 100,
    marginBottom : 10,
    fontFamily: "Inter_900Black"
  },
  loadingView : {
    transform : 'scale(1.5)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor : "black",
    opacity : 0.7,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    fontFamily: "Nunito_400Regular",
    color : PRIMARY_COLOR,
    margin: 15
  },
  passcodeBox: { 
    color : PRIMARY_COLOR,
    width: "18%", 
    margin : 10,
  },
  passcodeDot : {
    marginHorizontal : 10,
    width : 24,
    height : 24,
    borderRadius : 50,
    borderWidth : 2,
    borderColor : PRIMARY_COLOR
  },
  passcodeView : {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical : 20,
    justifyContent : "center"
  },
  yourName: {
    color : PRIMARY_COLOR,
    textAlign : "center",
    fontFamily: "NotoSansGeorgian_400Regular",
    fontSize : 20,
  },
  inputName: {
    margin: 20,
    color : PRIMARY_COLOR,
    padding: 10,
    fontFamily: "Nunito_400Regular",
    borderRadius: 5,
    borderWidth : 2,
    borderStyle : "solid",
    borderColor : PRIMARY_COLOR,
    textAlign: "center",
    fontSize: 20,
  },
  submit: { 
    textAlign: "center" 
  },
  availability: {
    fontFamily: "Nunito_400Regular",
    textAlign : "center",
    letterSpacing: 0.5,
  },
  isnotavaliable: { 
    color: "red" 
  },
  wantTo: {
    fontFamily: "NotoSansGeorgian_400Regular",
    color : PRIMARY_COLOR,
  },
  wantToA: { 
    fontFamily : "NotoSansGeorgian_900Black",
    color : PRIMARY_COLOR,
  }
});

export default styles;