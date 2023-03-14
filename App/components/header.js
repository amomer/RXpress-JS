import React from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';
import colors from '../config/colors';

export default function Header(){
    return(
        <View style = {styles.header}>
            <Text style = {styles.title}>
                My Prescriptions
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 80,
        paddingTop:38,
        backgroundColor: colors.tertiary
    },
    title: {
        textAlign:'center',
        color: colors.black,
        fontSize:20,
        fontWeight:'bold'
    }
})