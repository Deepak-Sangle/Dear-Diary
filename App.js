import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import InputName from './src/components/inputName';
import useFonts from './hooks/useFonts';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <View styles={styles.container}>
      <InputName />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
