import React, {useState, useEffect}from 'react';
import { StyleSheet, View, Text, Button, TextInput, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-paper';
import colors from '../config/colors';
import Searchbar from '../components/SearchBar';
import { StatusBar } from 'expo-status-bar';
// import FormInput from "../components/FormInput";
// import FormButton from "../components/FormButton";
// import SocialButton from "../components/SocialButton";


function HomeScreen({ navigation }) {
    // const [input, setInput] = useState('');
    // const List = ({searchPhrase, setClicked, data}) => {
    //     const renderItem = ({item}) => {
    //         if (searchPhrase === ""){
    //             return <Item name = {item.name} details = {item.details}/>;
    //         }
    //         if (item.name.toUpperCase().includes(searchPhrease.toUpperCase))
    //     }
    // }
    let url = "https://rxnav.nlm.nih.gov/REST/drugs.json?name="

    const [data, setData] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [value, setValue] = useState('')


    useEffect(() => {

        // onChangeText
        // let newUrl = url + value
        // console.log(newUrl)
        // console.log(url + value)
        fetch(value)
        .then((res) => res.json())
        .then(
            (result) => {
        //   result = JSON.stringify(result);
        //   console.log(result.drugGroup.conceptGroup[1].conceptProperties[1].name)
          setLoading(false)
          setData(result.drugGroup.conceptGroup[1].conceptProperties[1].name)
            },
            ({error}) => {
                setLoading(false);
                setError(error);
            }
            )
    }, [value]);

    function updateSearch(value){
        console.log(url + value)
        setValue(url + value)
    }

    const getContent = () => {
        if(loading) {
            return <ActivityIndicator size = 'large'/>
        }

        if(error){
            return <Text>{error}</Text>
        }

        console.log(data)
        return <Text style = {styles.results}>{data}</Text>
    }

    return (
        <View style = {styles.container}>
            <View
            style = {styles.searchBar}
            >
                <Searchbar
                value = {value}
                updateSearch = {updateSearch}
                style = {{marginTop: '8%', }}
                />
                {/* <Text style = {styles.searchBar}>{value}</Text> */}
            </View>

            <View>
                <Text style = {styles.results}>Synonyms for your search...</Text>
                {getContent()}
                <StatusBar style = 'auto'/>
            </View>
            {/* <FormButton
            buttonTitle="Prescriptions" color="#6FDFC3"
            onPress={() => navigation.navigate("PrescriptionsScreen")}
            />
            <FormButton
            buttonTitle="Calendar" color="#6FDFC3"
            onPress={() => navigation.navigate("CalendarScreen")}
            />
            <FormButton
            buttonTitle="" color="#6FDFC3"
            onPress={() => navigation.navigate("Reminder")}
        /> */}
            <View>
                <Text></Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input: {
        // marginBottom: 10,
        // paddingHorizontal: 8,
        // paddingVertical: 6,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.secondary,
    },
    searchBar: {
        marginTop:5,
        height: '10%',
        // backgroundColor: colors.tertiary,
        borderRadius: 5,
    },
    results: {
        paddingHorizontal:10,
        fontSize:16,
        fontWeight:'bold',
        alignSelf:'center',
        alignContent:'center',
        color: colors.tertiary
    }
})
export default HomeScreen;
