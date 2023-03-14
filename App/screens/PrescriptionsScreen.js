import React, {useState} from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View , FlatList, Alert, Button} from 'react-native';
import colors from '../config/colors';
import Header from '../components/header'
import MedicationItem from '../components/MedicationItem';
import AddMeds from '../components/addMed';
// import PrescriptionNavigator from '../navigation/prescriptionStack'

export default function Todo({navigation}){
    const [medications, setMeds] = useState ([
        // { name: 'ibuprofen',    dosage: '20', units:'mg', frequency:'Once in the morning', reqs: 'Eat with Food', rx:'#00000',  key: '1' },
        // { name : 'allegra',     dosage: '20', units:'mg', frequency:'Once in the morning', reqs: 'Eat with Food', rx:'#00000',  key : '2' },
        // { name : 'claratin',    dosage: '20', units:'mg', frequency:'Once in the morning', reqs: 'Eat with Food', rx:'#00000',  key :'3'}
    ]);

    // Interacts from medicationItem to Todo.js
    const pressHandler = (key) => {
        setMeds((prevMeds) => {
            return prevMeds.filter(meds => meds.key != key);
        });
    }

    const submitHandler = (text) => {

        if(text.length > 3){
            setMeds((prevMeds) => {
                return[
                    {text: text, key: Math.random().toString() },
                    ...prevMeds];
            });
        }
        else {
            Alert.alert('OOPS', 'Medications must be more than *3* characters long', [
                {text: 'Close', onPress: () => console.log('alert closed')}
            ])
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('dismissed keyboard');
            }}>
        <View style = {styles.container}>
            {/* <Header/> */}
            <View style = {styles.content}>
                <View style = {styles.list}>
                    <FlatList
                    data ={medications}
                    renderItem={({ item }) => (
                        <MedicationItem item ={item} 
                        pressHandler = {pressHandler}
                        />
                    )}/>
                </View>
                    <Button
                    onPress={() => navigation.navigate('AddMedication')} 
                    title = 'add medication' color = '#22DE81'
                    style = {styles.button}/>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop:10,
    },
    container:{
        flex: 1,
        backgroundColor: colors.white,
    },
    content :{
        padding:40,
        flex:1
    },
    list:{
        marginTop:20,
        borderRadius: 20,
        overflow:'scroll',
        flex:1,
    },
});
