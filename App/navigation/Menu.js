import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import FAQScreen from '../screens/FAQScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
//import Drawer from '../navigation/Drawer';

const Drawer = createDrawerNavigator();

const myMenu = () => {
    return (
//        <NavigationContainer>
      	    <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Prescriptions" component={PrescriptionsScreen} />
	        <Drawer.Screen name="Calendar" component={CalendarScreen} />
	        <Drawer.Screen name="FAQ" component={FAQScreen} />
	        <Drawer.Screen name="Settings" component={SettingsScreen} />
            </Drawer.Navigator>
//        </NavigationContainer>
    );
};

export default myMenu;
