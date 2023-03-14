import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { auth, signInWithEmailAndPassword } from 'firebase/auth';
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";

//const auth = getAuth();
export default function LoginScreen ({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Image source={require('../assets/try1.png')}
       style={{ height: 100, width: 100, color: '#fff' }}/>

      {/* <Text style={styles.text}>RxPress</Text>
      <Image style={styles.logo} source={require('../assets/Logo 1.png')}/> */}
      <FormInput
        lableValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        keyboardType="email-address"
        placeholder='Username'
        autoCapitalize="none"
        iconType="user"
        autoCorrect={false}
      />
      <FormInput
        lableValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        iconType="lock"
        placeholder='Password'
	autoCorrect={false}
      />
      <FormButton
        buttonTitle="Login"
        onPress={() => signInWithEmailAndPassword(auth, email, password)
 			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			})
	}
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() =>{navigation.navigate("ForgotPasswordScreen")}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => signInWithGoogle}
      />
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("SignUpScreen")}>
        <Text style={styles.navButtonText}>
          Don't have a account? Click here
        </Text>
      </TouchableOpacity>
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
