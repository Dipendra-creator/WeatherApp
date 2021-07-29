import React from "react";
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    title: any
    variable: any
}

const InfoCard = (props: Props) => {
    return(
        <View style={styles.card}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={[styles.text, {color: '#ffffff'}]}>{props.variable}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        alignItems: 'center',
        margin: 10,
        minWidth: 150,
    },
    text:{
        color: '#ffffff',
        margin: 5,
        marginLeft: 15,
        fontSize: 18,
    },
});

export default InfoCard;
