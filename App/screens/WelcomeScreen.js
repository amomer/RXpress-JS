import React from 'react';
import {TouchableOpacity ,KeyboardAvoidingView, Text, Image, ImageBackground , StyleSheet, View, TouchableHighlight, TouchableNativeFeedback, TextInput} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'

import colors from '../config/colors';

function WelcomeScreen(props) {
    return (
        <ImageBackground style = {styles.background}>
            <View style={styles.logoContainer}>
                <Text style ={styles.WelcomeText}>Welcome!</Text>
                <Image style={styles.logo} source ={require("../assets/RXPress-Logo.png")}/>
                
                <TextInput 
                style= {styles.input}
                placeholder = 'Email' 
                />
                
                <TextInput
                style = {styles.input}
                placeholder = 'Password'
                secureTextEntry = {true}/>

                <TouchableOpacity onPress={() => console.log("Forgot Password Was Pressed")}>
                    <Text style= {styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableNativeFeedback onPress={() => console.log("Sign In Button Was Pressed")}>
                    <LinearGradient 
                    style = {styles.loginButton} 
                    colors = {[colors.primary, colors.secondary]}
                    start = {[.8,0]} >
                        <Text style ={styles.loginText}>
                            SIGN IN
                        </Text>  
                    </LinearGradient>
                </TouchableNativeFeedback>

                
                <TouchableNativeFeedback onPress={() => console.log("Create Account Button Was Pressed")}>
                    <LinearGradient  
                    style = {styles.registerButton} 
                    colors ={[colors.primary, colors.secondary]}
                    start = {[.8, 0]}>
                        <Text style = {styles.registerText}>
                            CREATE ACCOUNT
                        </Text>
                    </LinearGradient>
                </TouchableNativeFeedback>
                
            </View>
        <View>
            
        </View>

        
        

        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent:'flex-end'
    },
    loginButton:{
        width:'80%',
        height:60,
        //backgroundColor: colors.primary,
        position:'absolute',
        top:355,
        alignSelf:'center',
        borderRadius: 30,
        
    },
    registerButton:{
        width:'80%',
        height:60,
        backgroundColor:colors.secondary,
        position:'absolute',
        top:425,
        alignSelf:'center',
        borderRadius:30
    },
    loginText:{
        position:'relative',
        alignSelf:'center',
        top:18,
        fontWeight:'bold',
        fontSize:20
    },
    registerText:{
        position:'relative',
        alignSelf:'center',
        top:18,
        fontWeight: 'bold',
        fontSize:20
    },
    logo:{    
        flex:1,
        width: 400,
        height: 100,
        resizeMode:'contain',
        alignItems:'center'
    },
    logoContainer:{
        position:'absolute',
        top:'25%',
        alignItems:'center'
    },
    WelcomeText:{
        color: colors.primary,
        fontSize: 40,
        fontWeight: 'bold',
        position:'relative',
        right: 60,
        bottom:60,
    },
    input:{
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 30,
        width: '80%',
        padding: 15,
        marginVertical: 7,
        justifyContent:'center',
        alignSelf:'center',
        position:'relative',
        top:20,
        textAlign:'center',
        fontSize:18

    },
    forgotPassword:{
        color: colors.tertiary,
        position:'relative',
        top:25
    }


})

export default WelcomeScreen;