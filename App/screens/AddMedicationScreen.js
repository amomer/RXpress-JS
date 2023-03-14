import React, {useEffect, useState} from 'react';
import { View, FlatList, StyleSheet, Alert, Text} from 'react-native'
import MedicationItem from '../components/MedicationItem';
import AddMeds from '../components/addMed';
import colors from '../config/colors';
import { NavigationHelpersContext } from '@react-navigation/native';
import { db, collection, addDoc } from "../firebaseConfig";

export default function AddMedicationScreen({navigation}) {
    
    const [medications, setMeds] = useState ([
        { name: 'ibuprofen',    dosage: '20', units:'mg', frequency:'Once in the morning', reqs: 'Eat with Food', rx:'#00000',  key: '1' },
        { name : 'allegra',     dosage: '20', units:'mg', frequency:'Once in the morning', reqs: 'Eat with Food', rx:'#00000',  key : '2' },
        { name : 'claratin',    dosage: '20', units:'mg', frequency:'Once in the morning', reqs: 'Eat with Food', rx:'#00000',  key :'3'}
    ]);
    const url = "";

    const pressHandler = (key, navigate) => {
        setMeds((prevMeds) => {
            return prevMeds.filter(meds => meds.key != key);
        });
        // setMeds((prevMeds) =>{
        //      return onPress => {navigation.navigate('Prescription')}
        // });
    }

    const submitHandler = (name) => {

        if(name.length >= 1){
            setMeds((prevMeds) => {
                return[
                    {name: name, key: Math.random().toString() },
                    ...prevMeds];
                    url = "https://rxnav.nlm.nih.gov/REST/drugs.json?name=" + prevMeds
            });
        }
        else {
            Alert.alert('OOPS', 'nothing was typed try again', [
                {text: 'Close', onPress: () => console.log('alert closed')}
            ])
        } 
    }


//     useEffect(() => {
//     fetch(url)
//     .then((res) => res.json())
//     .then(res => {
//       // data = JSON.stringify(data);
//       console.log(res.drugGroup.conceptGroup[1].conceptProperties[1].name)
//     })
//     .catch((error) => alert(error))
//     //.finally(setIsLoading(false));
//   });    

    return (
        <View style = {styles.container}>
            {/* <Header/> */}
            <View style = {styles.content}>
                <AddMeds submitHandler = {submitHandler}/>
                <View style = {styles.list}>
                <FlatList
                    data ={medications}
                    renderItem={({ item }) => (
                        <MedicationItem item ={item} 
                        pressHandler = {pressHandler}
                        />
                    )}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content :{
        padding:40,
    },
    list:{
        marginTop:20,
        borderRadius: 20,
        // backgroundColor: "yellow",
        overflow:'hidden'
    },
});
