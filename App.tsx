import { StatusBar } from 'expo-status-bar';
import {AppLoading} from 'expo'
import React from 'react';

import {
  Archivo_700Bold, Archivo_400Regular, useFonts
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular, Poppins_600SemiBold
} from '@expo-google-fonts/poppins'


import AppStack from './src/routes/AppStack';


export default function App() {

  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    Archivo_400Regular,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if(!fontsLoaded) {
    return <AppLoading />
    
  } else {
    return (
      <>
      <AppStack />
      <StatusBar style='light' />
      </>
    );
  }

}

