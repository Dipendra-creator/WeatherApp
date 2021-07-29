import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import {useState, useEffect} from 'react'
import * as Location from 'expo-location'
import { EvilIcons } from '@expo/vector-icons'
import ThemeContext from './context/ThemeContext';

import InfoCard from './components/InfoCard'
import MainCard from "./components/MainCard"

import getCurrentWeather from './api/consultApi'

export default function App() {
  const themeHook = useState("dark");
  const [darkTheme, setDarkTheme] = useState(true)

  const [currentTemperature, setCurrentTemperature] = useState('31')

  const [locationCoords, setLocationCoords] = useState(null);

  const [locationName, setLocationName] = useState('Agra, India')

  const [temperatureMin, setTemperatureMin] = useState('21')
  const [temperatureMax, setTemperatureMax] = useState('32')
  const [wind, setWind] = useState('7')
  const [humidity, setHumidity] = useState('68')


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232634'  :'#F2F2F2',
      alignItems: 'center',
    },
    refreshButton: {
      position: 'absolute',
      alignSelf: 'flex-start',
      margin: 30,
    },
    themeButtonCircle:{
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: darkTheme ? '#232634'  :'#ffffff',
    },
    temperatureView: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? '#ffffff'  : 'black',
      fontSize: 50,
    },
    cardsView:{
      color: darkTheme ? 'black'  : 'white',
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    localizationText:{
      color: darkTheme ? '#ffffff'  : 'black',
    },
    info: {
      alignItems: 'center',
      borderRadius: 20,
      width: 350,
      height: 230,
      backgroundColor: darkTheme ? '#393e54'  :'#5cbb4b',

    },
    infoText: {
      color: darkTheme ? '#fff'  : '#fff',
      margin: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    addtionalInfo:{
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    themeButtonSquare: {
      backgroundColor: darkTheme ? '#F2F2F2'  :'#8F8F8F',
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
  });

  async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      // @ts-ignore
      setErrorMsg('Permission to access location was denied')
    }else{
      let location = await Location.getCurrentPositionAsync({})
      // @ts-ignore
      await setLocationCoords(location.coords)
    }
  }

  async function setCurrentWeather(){
    await getLocation()
    // @ts-ignore
    const [data] = await Promise.all([getCurrentWeather(locationCoords)])
    //@ts-ignore
    setCurrentTemperature(convertKelvinToC(data[0]))
    // @ts-ignore
    setTemperatureMin(convertKelvinToC(data[1]))
    // @ts-ignore
    setTemperatureMax(convertKelvinToC(data[2]))
    setLocationName(data[3])
    setWind(data[4])
    setHumidity(data[5])

  }

  // @ts-ignore
  function convertKelvinToC(kelvin){
    //@ts-ignore
    return parseInt(kelvin - 273)
  }

  useEffect(() => {
    setCurrentWeather()
  }, [])

  return (
      //@ts-ignore
      <ThemeContext.Provider value={themeHook}>
        <View style={styles.container}>

          <TouchableOpacity style={styles.refreshButton} onPress={() => setCurrentWeather()}>
            <EvilIcons name="refresh" color={darkTheme ? 'white'  : 'black'} size={24}/>
          </TouchableOpacity>

          <Feather style={{marginTop: 50}} name="sun" size={40} color="orange" />

          <View style={styles.temperatureView}>
            <Text style={styles.temperatureText}>{currentTemperature}</Text>
            <Text style={[styles.temperatureText, {fontSize: 14}]}>°C</Text>
          </View>

          <Text style={styles.localizationText}>{locationName}, 13:52</Text>

          <View style={styles.cardsView}>
            <MainCard title={"Morning"} icon={'morning'} temperature={"27°"} backgroundColor={darkTheme ? '#D26F2F' : '#CC6E30'} />
            <MainCard title={"Afternoon"} icon={'afternoon'} temperature={"31°"} backgroundColor={darkTheme ? '#D29600' : '#FCC63F'} />
            <MainCard title={"Night"} icon={'night'} temperature={"21°"} backgroundColor={darkTheme ? '#008081' : '#38B7B8'} />
          </View>

          <View style={styles.info}>
            <Text style={styles.infoText}>Additional information:</Text>
            <View style={styles.addtionalInfo}>
              <InfoCard title={'Wind'} variable={wind} />
              <InfoCard title={'Moisture'} variable={humidity} />
              <InfoCard title={'Temp. Min'} variable={temperatureMin} />
              <InfoCard title={'Temp. Max'} variable={temperatureMax} />
            </View>
          </View>

          <View style={styles.themeButton}>
            <View style={styles.themeButtonSquare}>
              <TouchableOpacity style={styles.themeButtonCircle} onPress={() => darkTheme ? setDarkTheme(false) : setDarkTheme(true)}/>
            </View>
          </View>

        </View>
      </ThemeContext.Provider>
  );
}


