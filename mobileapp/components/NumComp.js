/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useDispatch} from 'react-redux';
import {addContacts, removeContact} from '../store/actions/contacts';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';
const NumComp = (props) => {
  const dispatch = useDispatch();
  const added = useSelector((state) => state.contacts.contacts);
  const isAdded = added.findIndex((el) => el.number == props.num);
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
      {isAdded === -1 ? (
        <Icon
          onPress={() => {
            dispatch(addContacts({name: props.name, number: props.num}));
          }}
          name="add-circle-outline"
          color="green"
          size={40}
        />
      ) : (
        <Icon
          onPress={() => {
            dispatch(removeContact(props.num));
          }}
          name="person-remove-outline"
          color="red"
          size={40}
        />
      )}
    </View>
  );
};

export default NumComp;
