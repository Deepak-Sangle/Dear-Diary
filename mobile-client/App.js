import 'react-native-gesture-handler';

import Login from './src/screens/Login';
import Registration from './src/screens/Registration';

import { useFonts } from 'expo-font';
import { Inter_900Black } from '@expo-google-fonts/inter';

import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';
import { Dosis_400Regular } from '@expo-google-fonts/dosis';
import { NotoSansGeorgian_400Regular, NotoSansGeorgian_900Black } from '@expo-google-fonts/noto-sans-georgian';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack'
import HomePage from './src/screens/HomePage';

export default function App() {
  
  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black, Roboto_400Regular, Nunito_400Regular, Dosis_400Regular, NotoSansGeorgian_400Regular, NotoSansGeorgian_900Black
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation : "slide_from_right"
        }}        
      >
        <Stack.Screen
          name="/login"
          component={Login}
        />
        <Stack.Screen
          name="/register"
          component={Registration}
        />
        <Stack.Screen
          name="/"
          component={HomePage}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}