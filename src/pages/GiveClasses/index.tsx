import React from 'react'

import { 
  View,
  ImageBackground,
  Text
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

// images 

import giveClassesBgImage from '../../assets/images/give-classes-background.png'


// Styles
import styles from './styles'

function GiveClasses () {

  const navigation = useNavigation()

  function onNavigateToHome(){
    navigation.goBack()
  }
  return (
    <View style={styles.container} >
      <ImageBackground 
        resizeMode='contain' 
        source={giveClassesBgImage} style={styles.content} 
      >

        <Text style={styles.title}>Que ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>

      </ImageBackground>
      <RectButton style={styles.button} onPress={onNavigateToHome}>
          <Text style={styles.buttonText}>Tudo bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses