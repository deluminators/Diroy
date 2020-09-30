import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Component = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>speed :{props.speed} (m/s)</Text>
      {props.coords ? (
        <Text style={styles.text}>
          coords :[{props.coords.x.toFixed(4)},{props.coords.y.toFixed(4)}]
        </Text>
      ) : null}
    </View>
  );
};
export default Component;
const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 100,
    height: 80,
    zIndex: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
