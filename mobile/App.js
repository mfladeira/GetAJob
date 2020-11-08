import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo'
import { Roboto_900Black_Italic, Roboto_500Medium_Italic, Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto'
import Routes from './src/routes'
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_900Black_Italic, Roboto_500Medium_Italic, Roboto_400Regular })
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
      <FlashMessage position="bottom" />
    </>
  );
}
