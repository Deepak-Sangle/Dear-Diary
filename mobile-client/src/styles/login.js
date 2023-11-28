import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nameScreen: {
    marginTop: 20,
    padding: 20,
    textAlign: "center",
    borderRadius: 10,
  },
  name: {
    textAlign : "center",
    fontSize: 40,
    margin: 30,
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
    justifyContent : "center"
  },
  yourName: {
    textAlign : "center",
    fontFamily: "NotoSansGeorgian_400Regular",
    fontSize : 20,
  },
  // // "input::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button": {
  // //   WebkitAppearance: "none",
  // //   margin: "0"
  // // },
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
  // "submit:hover": { backgroundColor: "#2d2d2d", color: "white" },
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