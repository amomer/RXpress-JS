import React, { useEffect, useState , useRef, Component} from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import colors from '../config/colors';
import SelectList from 'react-native-dropdown-select-list'
import { db, collection, addDoc } from "../firebaseConfig";
import { async } from '@firebase/util';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
export default function AddMeds({submitHandler}){

    // React.useEffect(() => {
    //     fetch()
    //     .then(results => results.json())
    //     .then(data => {
    //         const {meds} = data.results[0];
    //         setName(meds.name)
    //     });
    // }, []);
    // const url = "";
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         fetch(url)
    //         .then((res) => res.json())
    //         .then(res => {
    //         console.log(res.drugGroup.conceptGroup[1].conceptProperties[1].synonym)
    //         })
    //         .catch((error) => console.log(error))
    //     }, 500)
    //     //.finally(setIsLoading(false));
    //     return () => clearTimeout(timer)
    //   });  

    const medDetails = () => {
        navigation.navigate("MedicationDetails", 
        {   
            name : name,
            dosage: dosage,
            units:units,
            frequency:frequency,
            other:other,
            rxNum: rxNum
        })
    }

    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [units, setUnits] = useState('');
    const [frequency, setFrequency] = useState('');
    const [other, setOther] = useState('');
    const [rxNum, setRXNum] = useState('');

    // const url = "https://rxnav.nlm.nih.gov/REST/drugs.json?name=Allegra"
    const changeHandler= (val) => {
        setText(val);
    }

    const submitAndClear = () => {
        name.current.value = '';
    }

    const firestore = getFirestore();

    const Medications = doc (firestore, 'addMedication/JJbQl26nfajeUqlGIkd8')
    async function addANewDocument(){
        const docRef = {
            Name: name,
            Dosage: dosage,
            Units: units,
            Frequency: frequency,
            Other: other,
            rxnum: rxNum
          };
        setDoc(Medications, docRef, {merge:true})
        console.log(`Your doc was created at ${docRef.path}`);
    }

    addANewDocument();
    


    const [selected, setSelected] = useState("");

    // const data = [
    //     {key : '1', value: 'mg'},
    //     {key : '2',value : 'g'},
    //     {key : '3',value : 'kg'},
    //     {key : '4',value : 'mL'},
    //     {key : '5',value : 'dL'},
    //     {key : '6',value : 'L'},
    // ];

    return (
        <View>
            <TextInput
                style = {styles.input}
                placeholder='Medication Name (API)'
                // val = {this.name.val}
                onChangeText={(name) => setName(name)}
            />
            <TextInput
                style = {styles.input}
                placeholder='Dosage'
                onChangeText={((dosage) => {
                    setDosage(dosage)
                })
            }
                keyboardType = "number-pad"
            />
            <TextInput
                style = {styles.input}
                placeholder='Units'
                onChangeText={(units) => setUnits(units)}
            />
            {/* <SelectList
                data = {data}
                setSelected = {setSelected}
                /> */}
            <TextInput
                style = {styles.input}
                placeholder='Frequency'
                onChangeText={(frequency) => setFrequency(frequency)}
            />
            <TextInput
                style = {styles.input}
                placeholder='Enter Other Requirements (e.g. food, drink)'
                onChangeText={(other) => setOther(other)}
            />
            <TextInput
                style = {styles.input}
                placeholder='Rx Number'
                onChangeText={(rxNum) => setRXNum(rxNum)}
                keyboardType = "number-pad"
            />
            <Button 
            onPress={() => {submitHandler(name); setName({val:''});}} 
            title = 'add medication' color = '#22DE81'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    }
})
