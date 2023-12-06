import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  nameScreen: {
    padding: 20,
    height : HEIGHT,
    textAlign: "center",
  },
  name: {
    textAlign : "center",
    fontSize: 40,
    margin: 30,
    marginTop: 100,
    fontFamily: "Inter_900Black"
  },
  description: {
    fontFamily: "Nunito_400Regular",
    margin: 15
  },
  passcodeBox: { 
    width: "18%", 
    margin : 10,
  },
  passcodeView : {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical : 20,
    justifyContent : "center"
  },
  yourName: {
    textAlign : "center",
    fontFamily: "NotoSansGeorgian_400Regular",
    fontSize : 20,
  },
  inputName: {
    margin: 20,
    padding: 10,
    fontFamily: "Nunito_400Regular",
    borderRadius: 5,
    borderWidth : 2,
    borderStyle : "solid",
    borderColor : "black",
    textAlign: "center",
    fontSize: 20,
  },
  submit: { 
    textAlign: "center" 
  },
  availability: {
    fontFamily: "Nunito_400Regular",
    letterSpacing: "0.5"
  },
  isnotavaliable: { 
    color: "red" 
  },
  wantTo: {
    fontFamily: "NotoSansGeorgian_400Regular",
    // textDecoration: "none",
    color: "#2d2d2d"
  },
  wantToA: { 
    fontWeight: "bold" 
  }
});

export default styles;