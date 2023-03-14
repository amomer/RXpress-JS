import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Task = (props) => {

  return (
    <View style={styles.object}>{/*This is contains the objective and */}
      <View style={styles.leftitem}>
        <View style={styles.box}></View>{/*This is the square on the left  when you add a task*/}
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circle}></View>{/*This is the small circle at on right when you add a task*/}
    </View>
  )
}

const styles = StyleSheet.create({
  object: {
    backgroundColor: '#F49F1C',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',

  },
  leftitem: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#030E4F',
    borderRadius: 5,
    width: 25,
    height: 25,
    opacity: 0.8,
    marginRight: 13.5,
  },
  itemText: {
    maxWidth: '80%',
  },
  circle: {
    width: 12,
    height: 12,
    borderColor: '#030E4F',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;