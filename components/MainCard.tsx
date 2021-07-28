import React, { useContext } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'

interface Props {
    icon: any
    title: any
    temperature: any
    backgroundColor: any
}
const MainCard = (props: Props) => {

    const Icon = () => {
        if(props.icon === 'morning'){
            return(
                <Feather style={styles.cardIcon} name="sun" size={40} color="white" />
            )
        }
        if(props.icon === 'afternoon'){
            return(
                <Fontisto style={styles.cardIcon} name="day-cloudy" size={40} color="white" />
            )
        }
        if(props.icon === 'night'){
            return(
                <Feather style={styles.cardIcon} name="cloud-rain" size={40} color="white" />
            )
        }
    }

    return(
        <View style={[styles.card, {backgroundColor: props.backgroundColor}]}>
            <Text style={styles.cardHourText}>{props.title}</Text>
            {/*//@ts-ignore*/}
            <Icon/>
            <Text style={styles.cardTemparatureText}>{props.temperature}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 2,
        width: 110,
        height: 210,

    },
    cardHourText:{
        color: 'white',
        margin: 5,
        fontSize: 20,
    },
    cardTemparatureText:{
        color: 'white',
        margin: 5,
        fontSize: 20,
    },
    cardIcon: {
        color: 'white',
        margin: 5
    },
});

export default MainCard;
