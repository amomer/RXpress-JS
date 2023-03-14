import React from 'react';
import{StatusBar} from 'expo-status-bar';
import data from '../components/data';
import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import {Transition,Transitioning} from 'react-native-reanimated';

const transition = (
  <Transition.Together> 
    <Transition.In type='fade' durationMs={200} />
    <Transition.Change />
    <Transition.Out type='fade' durationMs={200} />
  </Transition.Together>)

function FAQScreen() {
       const [currentIndex, setCurrentIndex]= React.useState(null);
       const ref = React.useRef();
      //  const [message, setMessage] = useState('');
      
      //   const click = () => 
      //     Alert.alert("Submission Successful", 
      //     "Thank you for you submission!"
      //   );
        
      //   const Change = event => {
      //     setMessage(event.target.value);
      //   };
      

        return (

//   DON't Delete might be important 
    //       <View>
    //       <Text>This is the FAQ page</Text>
    //       <TextInput
    //           type="text"
    //           id="message"
    //           name="message"
    //           value={message}
    //           onChangeText={ (message) => {setMessage(message) }}
    //           placeholder="Submit Question Here!"
    //       />
    //       <Button
    //           title="Submit" 
    //           onPress={click}>
    //       </Button>
    //       <Text>Your Question: {message}</Text>    
    //     </View>
    //   );
    // };

          <Transitioning.View 
          ref={ref}
          transition={transition}
          style = {styles.container}>
            <StatusBar hidden/>
            {data.map(({backColor,color,category,subCategories}, index)=> {
              return (
              <TouchableOpacity 
                key ={category} 
                onPress={()=>{
                  ref.current.animateNextTransition();
                  setCurrentIndex(index===currentIndex ? null : index);
                }}
                style={styles.cardContainer} activeOpacity={0.9}>
                <View style={[styles.card, {backgroundColor:backColor}]}>
                  <Text style={[styles.heading, {color}]}>{category}</Text>
                  {index === currentIndex && (<View style={styles.subCategoriesList}>
                    {subCategories.map((subCategory)=> (
                      <Text key={subCategory} style={[styles.body,{color}]}>
                        {subCategory}
                      </Text>
                    ))}
                    
                  </View>
                  )}
                </View>
                </TouchableOpacity>)
            })}
          </Transitioning.View>
        );
      };
        
            

// const data =[
//   { backg: '"#051d5f",',
//   color :'"#051d5f",',
//   category : 'How to Logout ?',
//   subCategories:[ 'by going to setting and clicking logout at the end','hi','end'], 
// },
//   { backg: '"#051d5f",',
//   color :'"#051d5f",',
//   category : 'How to Logout ?',
//   subCategories:[ 'by going to setting and clicking logout at the end','hi','bye'], },

// ]


export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 2,
  },
  
});




