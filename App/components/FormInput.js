import { View, TextInput ,StyleSheet} from 'react-native'
import React from 'react'
//import {windowWidth, windowHeight} from '../Dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign'
const FormInput =({lableValue, placeholderText,iconType, ...rest}) =>{
    return (
         <View style={styles.inputContainer}> 
            <View style={styles.iconStyle}> 
              <AntDesign name={iconType} size={25} color="#666"/>
            </View>
            <TextInput
              value= {lableValue}
              style={styles.input}
              numberOfLines={1}
              placehold={placeholderText}
              placeholderTextColor="#666"
              {...rest}
            />
         </View>

    );
};


export default FormInput;
    const styles = StyleSheet.create({
      inputContainer: {
       // height: windowHeight / 15,
       height : 50,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      inputField: {
        //width: windowWidth / 1.5,
        width: 40,
       // height: windowHeight / 15,
       height: 40,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
      },
      input: {
        fontFamily: 'Roboto',
        color: '#333',
        padding: 10,
        flex: 1,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconStyle: {
        alignItems: 'center',
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
      },
    });



