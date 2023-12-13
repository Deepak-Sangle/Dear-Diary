import { StyleSheet, Dimensions } from "react-native";

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = require('../constant.js');
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    marginHorizontal: 30,
  },
  writelogo: { 
    backgroundImage: "url('../images/write.png')" 
  },
  rightView: {
    padding: 20,
    flex :  1,
    display: "flex",
    alignItems: "center"
  },
  hello: {
    textAlign: "center",
    fontFamily : "Inter_900Black",
    margin: 10,
    color : PRIMARY_COLOR,
    fontSize: 40,
    marginTop : 30,
  },
  postDataView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  date: {
    fontFamily: "Roboto_400Regular",
    color: PRIMARY_COLOR,
    margin: 10,
  },
  data: { 
    width: "90%" 
  },
  entryBox: {
    margin: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    fontFamily: "Nunito_400Regular",
    borderRadius: 7,
    elevation : 2,
  },
  entry: { 
    textAlign: "center" 
  },
  entryDate: { 
    margin: 0,
    display : "flex",
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
    color : PRIMARY_COLOR,
  },
  entriesDiv: {
    marginTop : 20,
  },
  entryText : {
    marginTop : 10, 
    paddingHorizontal : 5,
  },
  entryData: {
    marginHorizontal : 5,
    lineHeight: 1.5,
    flex : 1,
  },
  mobileTopView: {
    display: "flex",
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 10,
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    elevation: 3,
  },
});

export default styles;