import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    "Nunito-Regular" : require('../assets/fonts/Nunito-Regular.ttf'),
    "Nunito-Medium" : require('../assets/fonts/Nunito-Medium.ttf'),
    "Nunito-Italic" : require('../assets/fonts/Nunito-Italic.ttf'),
    "Nunito-SemiBold" : require('../assets/fonts/Nunito-SemiBold.ttf'),
    "Nunito-Bold" : require('../assets/fonts/Nunito-Bold.ttf'),
  });
