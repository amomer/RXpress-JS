import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calendar from '../screens/CalendarScreen';
import FAQ from '../screens/FAQScreen';
import Prescriptions from '../screens/PrescriptionsScreen';
import Settings from '../screens/SettingsScreen';
import Home from '../screens/HomeScreen';
import AddMedications from '../screens/AddMedicationScreen';
import MedicationDetails from '../screens/MedicationDetailsScreen';
/*import Welcome from '../screens/WelcomeScreen';*/
const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "RXpress" }}
          />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name ="Prescriptions" component={Prescriptions}/>
          <Stack.Screen name ="Calendar" component={Calendar} />
          <Stack.Screen name ="Settings" component={Settings} />
          <Stack.Screen name = "AddMedications" component={AddMedications} options = {{title: "Add Medications"}} />
          <Stack.Screen name = "MedicationDetails" component = {MedicationDetails} options = {{title: "Medication Details"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default MyStack;