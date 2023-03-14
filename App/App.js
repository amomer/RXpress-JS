//import RootStackScreen from "./screens/RootStackScreen";
//import { NavigationContainer } from "@react-navigation/native";
//import * as React from 'react';
//import {View , StyleSheet, ActivityIndicator, Text, SafeAreaView, FlatList}from 'react-native';
//import { useEffect, useState } from 'react';
//import HomeNavigator from './navigation/homeStack';
//import PrescriptionNav from './navigation/prescriptionStack';
//import AddMedication from './screens/AddMedicationScreen'
//import colors from './config/colors';

//export default function App() {
//  let [isLoading, setIsLoading] = useState(true);
//  let [error, setError] = useState();
//  let [data, setData] = useState([]);


/*import { NavigationContainer } from "@react-navigation/native";
=======

import { NavigationContainer } from "@react-navigation/native";
>>>>>>> 25dbf61defaf383497f2e99eb3d054ef7af8fc8d
import * as React from 'react';
import {View , StyleSheet, ActivityIndicator, Text, SafeAreaView, FlatList}from 'react-native';
import { useEffect, useState } from 'react';
import HomeNavigator from './navigation/homeStack';
import PrescriptionNav from './navigation/prescriptionStack';
import AddMedication from './screens/AddMedicationScreen'
import colors from './config/colors';
*/
// export default function App() {
  
  // const getContent = () =>{
    //   if(isLoading){
      //     return <ActivityIndicator size = "large"/>
  //   }
  //   if(error){
  //     return <Text>{error}</Text>
  //   }
  //   console.log(response);
  //   return 
  //   (
  //   />
  //   )
  // };
  // const getData = () =>{
  //   console.log(data);
  // };


import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/homeStack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import RootStackScreen from "./screens/RootStackScreen";

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

//     <View style = {styles.container}>
//       {/* {getData()} */}
//       {/* <StatusBar style = 'auto'/> */}
//       <SafeAreaView style = {styles.navigator}>
//         <HomeNavigator/>
//       </SafeAreaView>
//       <View style ={styles.listContainer}>

//           {isLoading ? (
//             <ActivityIndicator />
//           ) : (
//             <FlatList 
//             data = {data} 
//             keyExtractor = {({id}, index) => id}
//             renderItem = {({item}) => (
//             <Text>
//               {item.conceptName}, 
//               {item.rxcui}
//             </Text>
            
//             )}
//         />
//           )
//         }
//       </View>
//     </View>
//   );
// }
//    <View style = {styles.container}>
      {/* {getData()} */}
      {/* <StatusBar style = 'auto'/> */}
      {/* <SafeAreaView style = {styles.navigator}> */}
//        <HomeNavigator/>
      {/* </SafeAreaView> */}
//    </View>
//  );
//}

//     <View style = {styles.container}>
//       {/* {getData()} */}
//       {/* <StatusBar style = 'auto'/> */}
//       {/* <SafeAreaView style = {styles.navigator}> */}
//         <HomeNavigator/>
//       {/* </SafeAreaView> */}
//     </View>
//   );
// }


/*const styles = StyleSheet.create({
  container:{
    flex : 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  listContainer:{
    backgroundColor: colors.primary,
    width: '90%',
    height: '25%',
    alignSelf:'center',
    flex:.5,
  },
  navigator:{
    width:'100%',
    height:'25%',
    flex:.5,
    marginBottom:50,
    // backgroundColor: colors.black
    // paddingBottom:50
  }
})
*/
export default App;

