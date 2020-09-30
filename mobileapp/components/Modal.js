/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
// import {setGroup} from '../../store/actions/location';

const NameModal = (props) => {
  const [value, setValue] = useState('');
  // const dispatch = useDispatch();
  if (!props.show) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          marginVertical: 15,
        }}>
        {props.title}
      </Text>
      {props.specific ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(s) => setValue(s)}
          placeholder="Identifier Key"
          autoFocus
        />
      ) : null}
      <View style={{flexDirection: 'row'}}>
        <TouchableNativeFeedback onPress={props.cancel}>
          <View style={{width: '50%', padding: 10}}>
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              CANCEL
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            if (props.specific && value.length > 0) {
              props.navigation.navigate('Broadcasting...', {key: value});
              // dispatch(setGroup(value));
              // props.press();
              setValue('');
            } else {
              props.navigation.navigate('Broadcasting...');
            }
          }}>
          <View style={{width: '50%', padding: 10}}>
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              CONFIRM
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default NameModal;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    zIndex: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    top: '40%',
    padding: 10,
    // translateY:
  },
  input: {
    marginVertical: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 5,
    width: '90%',
  },
});
