import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './Task';

export default function App() {
  const [Objective,setObjective] = useState();
  const [ObjectiveItems,setObjectiveItems] = useState([]);
  const AddObject = () => {{/** add objective to the array */}
    Keyboard.dismiss(); {/*pull the keyboard down after user is done typing */}
    setObjectiveItems([...ObjectiveItems, Objective])
    setObjective(null);
  }
  const DeleteObject = (index) => {{/** Deletes objective from the array */}
    let itemsCopy = [...ObjectiveItems];
    itemsCopy.splice(index, 1);
    setObjectiveItems(itemsCopy)
  }
  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.ObjectWrap}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            ObjectiveItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => DeleteObject(index)}>
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeObjectWrap}>{/* pull up keyboard on moblie when you want to write a objective */}
        <TextInput style={styles.input} placeholder={'Write a task'} value={Objective} onChangeText={text => setObjective(text)} />
        <TouchableOpacity onPress={() => AddObject()}>
          <View style={styles.addWrap}>
            <Text style={styles.addText}>+</Text>{/* add objective */}
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EC9B',
    flex: 1,
  },
  ObjectWrap: {
    paddingHorizontal: 25,
    paddingTop: 90,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 25
  },
  items: {
    marginTop: 30,
  },
  writeObjectWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    width: 310,
    borderRadius: 60,
    borderColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  addWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderColor: '#FFF',
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 60,
  },
});
