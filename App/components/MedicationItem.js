import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import {MaterialIcons} from '@expo/vector-icons'

import colors from '../config/colors';

export default function MedicationItem({ item, pressHandler, navigation, medDetails }){
    
    return(
        <TouchableOpacity 
        onPress = {() =>{medDetails}}
        >
            <LinearGradient
            style = {styles.list}
            colors = {[colors.primary, colors.secondary]}
            start = {[.8,0]}
            >   
                <View style = {styles.item}>
                    <TouchableOpacity onPress={() => pressHandler(item.key)}>
                        <MaterialIcons 
                        name = "delete"
                        size = {18}
                        color = "black"/>
                    </TouchableOpacity>
                    <Text style = {styles.itemText}>
                        {item.name}
                        {/* {item.dosage} */}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        padding:10,
        marginTop:10,
        borderColor: colors.primary,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection:'row',
    },
    itemText:{
        marginLeft: 5
    }
})
