import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'

// components
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'


import {Feather} from '@expo/vector-icons'

// styles
import styles from './styles'



function TeacherList() {

  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const [favoties, setFavorites] = useState<Number[]>([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState([])


  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersIds)
      }
    })
  }
  
 

  function onIsFilterVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function onFiltersSubmit() {
    loadFavorites()
    
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    
    setIsFiltersVisible(false)
    setTeachers(response.data)
  }


  return (
    <View style={styles.container} >
      <PageHeader 
        title='Proffys disponíveis'
        headerRight={(
          <BorderlessButton onPress={onIsFilterVisible}>
            <Feather name='filter' size={20} color='#fff' />
          </BorderlessButton>
        )} 
      >

        { isFiltersVisible && (
          <View style={styles.searchForm}>

            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              placeholder='Qual a Matéria'
              placeholderTextColor='#c1bccc'
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>

                <Text style={styles.label}>Semana</Text>
                <TextInput 
                  style={styles.input}
                  placeholder='Dia da semana'
                  placeholderTextColor='#c1bccc'
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>

                <Text style={styles.label}>Horarío</Text>
                <TextInput 
                  style={styles.input}
                  placeholder='Qual Horarío'
                  placeholderTextColor='#c1bccc'
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={onFiltersSubmit}>

              <Text style={styles.submitButtonText}>Filtrar</Text>

            </RectButton>

          </View> ) }
      </PageHeader>

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >

        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favoties.includes(teacher.id)}
           />
          )
        })}

      </ScrollView>

    </View>
  )
}

export default TeacherList