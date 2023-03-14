import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import HomeScreen from "./HomeScreen";
import Menu from "../navigation/Menu";
import AddMedication from "./AddMedicationScreen"
import Calendar from "./CalendarScreen";
import Reminders from "./EventCreationScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import FAQScreen from "./FAQScreen";
//import ForgotPasswordScreen from "./ForgotPasswordScreen";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Menu from "../navigation/Menu";
// import FAQ from "./FAQScreen";
// import Prescriptions from "./PrescriptionScreen";

// import Calendar from "./CalendarScreen";
// import Settings from "./SettingsScreen";
/*function RootStackScreen() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" component={<LoginScreen />} />
	  <Route exact path="/homeScreen" component={<HomeScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default RootStackScreen;
*/
const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <NavigationContainer independent={true}>
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
    <RootStack.Screen name="AddMedication" component={AddMedication} />
    <RootStack.Screen name="Calendar" component={Calendar} />
    <RootStack.Screen name="Reminder" component={Reminders} />
    <RootStack.Screen name ="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    <RootStack.Screen name="FAQScreen" component={FAQScreen} />
    
        {/* <RootStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ title: "RXpress" }}
    /> }
    {/* <RootStack.Screen name="FAQ" component={FAQ} />
    <RootStack.Screen name="Prescriptions" component={Prescriptions} />
    <RootStack.Screen name="Calendar" component={Calendar} />
    <RootStack.Screen name="Settings" component={Settings} /> */}
  </RootStack.Navigator>
  </NavigationContainer>
);
export default RootStackScreen;

