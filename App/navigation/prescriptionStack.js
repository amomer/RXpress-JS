import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddMedicationScreen from '../screens/AddMedicationScreen';
import Prescriptions from '../screens/PrescriptionsScreen';
/*import Welcome from '../screens/WelcomeScreen';*/
const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Prescriptions"
            component={Prescriptions}
            options={{ title: "My Prescriptions" }}
          />
          <Stack.Screen name="AddMeds" component={AddMedicationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default MyStack;