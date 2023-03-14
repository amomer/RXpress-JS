import React, {useState} from 'react';
import {View,Text,TouchableOpacity, StyleSheet, Button} from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../firebaseConfig';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
//import HomeScreen from "../screens/HomeScreen";


export default function SignUpScreen({navigation}) {
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [confirmpassword,setConfirmPassword]= useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');

    const PasswordVisibility = () => {
      if (rightIcon === 'eye') {
        setRightIcon('eye-off');
	setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-off') {
	setRightIcon('eye');
	setPasswordVisibility(!passwordVisibility);
      }
    };

    const onSignup = () => {
     // try {
        if (email !== '' && password !== '') {
          //auth.createUserWithEmailAndPassword(email, password);
	  navigation.navigate("HomeScreen");
        }
     // } catch (error) {
     //   setSignupError(error.message);
     // }
    };

    return (
        <View style={styles.container}>
        <Text style= {styles.text} >Create an Account</Text>
        <FormInput 
            lableValue={email}
            onChangeText={(userEmail)=> setEmail(userEmail)}
            placeholder='Enter Email'
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
        />
        <FormInput 
            lableValue={password}
            onChangeText={(userPassword)=> setPassword(userPassword)}
            placeholder='Password'
            iconType="lock"
            secureTextEntry={true}
//	    PasswordVisibility={PasswordVisibility}
        />
        <FormButton 
        buttonTitle= "Sign Up"
        onPress={() => navigation.navigate('Menu')}
        />
        <View style= {styles.textPrivate}>
            <Text style= {styles.color_textPrivate}>By registering, you can confirm that you accept out</Text>
            <TouchableOpacity OnPress={()=> alert('Terms Clicked!')}> 
                <Text style= {[styles.color_textPrivate,{ color:'#e88832'}]}> Terms of service</Text></TouchableOpacity>
            <Text style= {styles.color_textPrivate}> and </Text>
            <Text style= {[styles.color_textPrivate,{color:'#e88832'}]}>Privacy Policy</Text>
        </View>

        <SocialButton  
        buttonTitle= "Sign Up with Google "
        btnType="google"
        color='#de4d41'
        backgroundColor='#f5e7ea'
        onPress={()=> {}}
        />



        <TouchableOpacity style={styles.navButton} 
        onPress={()=> navigation.navigate('LoginScreen')}> 
        <Text style={styles.navButtonText}>Have a account? Click here</Text>
        </TouchableOpacity>


        </View>

    );
};

//export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        paddingTop: 50,
        alignItems: 'center'
      },
      navButton: {
        marginTop: 15,
      },
      textPrivate: {
        flexDirection: 'row',
        marginVertical: 35,
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      navButtonText: {
        
        fontWeight: '500',
        fontSize: 18,
        color: '#2e64e5',
        fontFamily: 'Roboto',
      },
      text: {
        fontFamily: 'Roboto',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      color_textPrivate: {
        fontSize: 13,
        fontFamily: 'Roboto',
        color: 'grey',
        fontWeight: '400',
      },

});
