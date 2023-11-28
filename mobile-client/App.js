import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';

import { useFonts } from 'expo-font';
import { Inter_900Black } from '@expo-google-fonts/inter';

import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';
import { Dosis_400Regular } from '@expo-google-fonts/dosis';
import { NotoSansGeorgian_400Regular } from '@expo-google-fonts/noto-sans-georgian';

export default function App() {
  
  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black, Roboto_400Regular, Nunito_400Regular, Dosis_400Regular, NotoSansGeorgian_400Regular, 
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View>
      <Login/>
    </View>
  );
}