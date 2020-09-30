import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const FOOTER_HEIGHT = 64;

const Footer = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon name="location" size={24} />
        <Icon name="cellular" size={24} />
        <Icon name="network" size={24} />
      </View>
    </SafeAreaView>
  );
};
export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F9',
    paddingTop: 0,
    borderTopWidth: 1,
    borderColor: '#DADADA',
    // position: 'absolute',
    // bottom: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    height: FOOTER_HEIGHT,
  },
});
