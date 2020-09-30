/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import NumComp from '../../components/NumComp';

const Component = (props) => {
  const [contacts, setContacts] = useState();
  const getPermissions = async () => {
    const res = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    // console.log(res);
    if (res === PermissionsAndroid.RESULTS.GRANTED) {
      Contacts.getAll((err, contacts) => {
        if (err) {
          console.log(err);
        }
        let con = contacts.filter((el) => el.phoneNumbers.length > 0);
        con = con.map((el) => {
          return {name: el.displayName, number: el.phoneNumbers[0].number};
        });
        console.log(con);
        setContacts(con);
      });
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);

  if (!contacts) {
    return <ActivityIndicator color="black" size="large" />;
  }
  return (
    <ScrollView>
      <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 10}}>
        Add to emergency
      </Text>
      {contacts.map((el, index) => {
        // console.log(el);
        // let isAdded = added.find((e) => el.number == e.number);
        return (
          <NumComp
            // added={isAdded}
            name={el.name}
            num={el.number}
            key={index + ''}
          />
        );
      })}
    </ScrollView>
  );
};
export default Component;
