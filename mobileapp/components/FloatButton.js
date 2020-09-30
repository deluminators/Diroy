import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Component = (props) => {
  return (
    <TouchableOpacity onPress={props.pressHandler} style={styles.screen}>
      {/* <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
        calliberate
      </Text> */}
      <Icon name="locate-outline" color="white" size={38} />
      {/* <Text style={styles.text}>{props.index.grade}</Text> */}
    </TouchableOpacity>
  );
};
export default Component;
const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 60,
    height: 60,
    zIndex: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
