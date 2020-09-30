/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Button from '../../components/Button';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
const Component = (props) => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.screen}>
      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          paddingVertical: 8,
          width: '90%',
          marginVertical: 10,
        }}
        placeholder="Enter Identifier Key"
        value={value}
        onChangeText={(e) => setValue(e)}
      />
      <Button
        onPress={() => {
          Alert.alert(
            'Info!',
            'Location of the searched key only be shown, If user has allowed you to do the same.',
          );
        }}>
        Search
      </Button>
    </View>
  );
};
export default Component;
const styles = StyleSheet.create({
  screen: {alignItems: 'center', justifyContent: 'center'},
});
