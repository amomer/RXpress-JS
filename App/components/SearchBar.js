import React, { useState } from 'react';
import {Image, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, TouchableOpacity, TextInput, ViewBase} from "react-native"
import HomeScreen from '../screens/HomeScreen';
import colors from '../config/colors';
import {Ionicons} from '@expo/vector-icons/Ionicons'
// import SearchBar from "../component/SearchBar"

function SearchBar({value, updateSearch, style}) {

    const [query, setQuery] = useState('')
    const [error, setError] = useState()
    const [updated, setUpdated] = useState('')

    // const handleKeyDown = (event) => {
    //     if (event.key == "Enter") {
    //         setQuery()
    //     }
    // }
    return (
        <View style = {styles.container}>
            <View style = {styles.searchContainer}>
                <View style = {styles.vwSearch}>
                <TouchableOpacity
                    onPress={()=>setQuery(query)}
                    style ={styles.icSearch}>
                    <Image
                    source = {require("../assets/ic_search.png")}
                    style = {styles.icSearch}
                    />
                </TouchableOpacity>
                </View>
                    <TextInput
                    value={query}
                    style ={styles.textInput}
                    placeholder = "Search Here"
                    onChangeText = {(text) => {
                        var letters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
                        if(text.length > 30){
                            setError("Query to long")
                        }
                        else if(text.match(letters)){
                            setQuery(text)
                            updateSearch(text)
                            if(error){
                                setError(false)
                            }
                        } 

                        }}
                    // onPressConfirm = {() => setConfirm(text)}
                    />
                <View style = {styles.vwClear}>
                {
                    query ?
                    <TouchableOpacity
                    onPress={()=>setQuery('')}
                    style ={styles.icClear}>
                        <Image
                        style = {styles.icClear}
                        source = {require('../assets/ic_clear.png')}/>
                    </TouchableOpacity>
                    : <View style = {styles.vwClear}/>
                }
                </View>
            </View>
            {
                error &&
                <Text style = {styles.txtError}>
                    {error}
                </Text>
            }
            {/* <SearchBar
                searchText = {searchText} setSearchText = {setSearchText}/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:80,
        alignItems: "center",
    },
    icClear:{
        width:20,
        flexDirection:"column",
        alignContent:"center",
        alignItems: 'center',
        resizeMode: 'contain',
        tintColor: colors.secondary,
    },
    icSearch:{
        width:20,
        flexDirection:"column",
        alignContent:"center",
        alignItems: 'center',
        resizeMode:'contain',
        tintColor: colors.secondary
    },
    searchContainer:{
        backgroundColor: colors.white,
        width: '90%',
        height: 40,
        flexDirection:'row',
        borderRadius: 20,
        borderWidth:2,
        borderColor: colors.primary
    },
    txtError:{
        // backgroundColor: colors.primary,
        width: '90%'
    },
    textInput:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    },
    vwClear:{
        flex:.2,
        justifyContent: 'center',
        alignItems: 'center',
        width:40,
    },
    vwSearch:{
        flex:0.2,
        justifyContent: 'center',
        alignItems: 'center',
        width:40,
    }
})
export default SearchBar;