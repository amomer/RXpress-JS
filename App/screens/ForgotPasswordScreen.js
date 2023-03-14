// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ForgotPasswordScreen = () => {
//   const [message, setMessage] = useState('');
//   const [isSuccessMessage, setIsSuccessMessage] = useState(false);
//   const handlelogin = async(credentials, setSubmitting) => {
//     try {
//       setMessage(null);
    
//     setSubmitting(false);
//     }
//     catch(error){
//       setMessage('Login Failed'+ error.message);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <MainContainer>
//       <KeyboardAvoidingContainer> 
//         <IconHeader name="key" style ={{marginBottom:30}}/>
//         <RegularText style={{marginBottom: 25}} >Enter account information</RegularText>
//         <Formik initialValues={{email:'', password:''}} onSubmit={(values,{ setSubmitting }) => {
//           if(values.email =='' || values.password =='') {
//             setMessage('Please Fill in the fields');
//             setSubmitting(false);
//           }
//           else{
//             handleLogin(values, setSubmitting);
//           }
//         }}
// >
// {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => {

// }}

//     <View>
//       <Text>ForgotPasswordScreen</Text>
//     </View>
//   )
// }

// export default ForgotPasswordScreen

// const styles = StyleSheet.create({})

// import { View, Text } from 'react-native'
// import React from 'react'

// const ForgotPasswordScreen = () => {
//   return (
//     <View>
//       <Text>ForgotPasswordScreen</Text>
//     </View>
    
//   )
// }

// export default ForgotPasswordScreen


import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { auth, signInWithEmailAndPassword } from 'firebase/auth';
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

//const auth = getAuth();
export default function ForgotPasswordScreen ({navigation}) {
  const [email, setEmail] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RxPress</Text>
      <Image style={styles.logo} source={require("../assets/Logo 1.png")}/>
      <FormInput
        lableValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        keyboardType="email-address"
        placeholder='Enter Email'
        autoCapitalize="none"
        iconType="user"
        autoCorrect={false}
      />
      <FormButton
        buttonTitle="Reset Password"
        onPress={() => signInWithEmailAndPassword(auth, email)
 			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			})
	}
      />
      {/* <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.navButtonText}>
          Sign in Click here
        </Text>
      </TouchableOpacity> 
      want to get rid of this or not need */}
    </View>
  );
};

//export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 400,
    flex: 1,
    alignItems: "center",
    position: "absolute",
    top: 100,
  },
  text: {
    fontFamily: "Roboto",
    marginBottom: 10,
    color: "#051d5f",
    fontSize: 28,
  },
  navButtonText: {
    fontSize: 18,
    color: "#2e64e5",
    fontFamily: "Roboto",
    fontWeight: "500",
  },
});

//<Text style= {styles.text} >RXPress</Text>
