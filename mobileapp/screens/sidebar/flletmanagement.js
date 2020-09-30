/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NumComp = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderBottomColor: 'grey',
        borderTopWidth: 1,
      }}>
      <Text
        style={{fontSize: 18, fontWeight: '600', textAlignVertical: 'center'}}>
        {props.name}
      </Text>

      <Icon
        onPress={() => {
          //   dispatch(removeContact(props.num));
        }}
        name="person-remove-outline"
        color="red"
        size={40}
      />
    </View>
  );
};

const Component = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 5}}>
        Add people to your group
      </Text>
      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          paddingVertical: 8,
          width: '90%',
          marginVertical: 10,
        }}
        placeholder="Search For People To add"
        // value={value}
        // onChangeText={(e) => setValue(e)}
      />
      <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 5}}>
        People in your group
      </Text>
      <NumComp name="aldkfivaj" />
      <NumComp name="akdjfkv" />
      <NumComp name="sdkjfivna" />
      <NumComp name="adfava" />
      <NumComp name="aldkfagndivaj" />
      <NumComp name="aldknfdgfivaj" />
      <NumComp name="aldfnfkfivaj" />
    </View>
  );
};
export default Component;
const styles = StyleSheet.create({
  screen: {alignItems: 'center', justifyContent: 'center'},
});
