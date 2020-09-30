import React, {useLayoutEffect} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import NumComp from '../../components/NumComp';
import * as Location from 'expo-location';
import HeaderButton from '../../components/HeaderButton';
const SendSMS = NativeModules.SendSMS;
const Home = (props) => {
  const contacts = useSelector((state) => state.contacts.contacts);

  const sendSMS = async () => {
    const grant = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
    );
    if (grant !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('not');
      return;
    }
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'give permission',
        'Permission to access location was denied',
      );
    }

    let res = await Location.getCurrentPositionAsync({});
    const rec = contacts.map((el) => el.number);
    console.log(rec);
    const resp = await SendSMS.sendSms(
      rec[0],
      `Hey.., this is me!\nMy locations are [latitude : ${res.coords.latitude} longitude: ${res.coords.longitude}]. `,
    );
    console.log(res.coords);
    console.log(resp);
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-menu"
            color="white"
            size={25}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        );
      },
    });
  });
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Button onPress={() => props.navigation.navigate('Contacts')}>
        Add contacts for emergency
      </Button>
      <Button onPress={sendSMS}>Send Your location</Button>
      {contacts.map((el, index) => {
        return <NumComp num={el.number} name={el.name} key={index + ''} />;
      })}
    </ScrollView>
  );
};
export default Home;
const styles = StyleSheet.create({
  screen: {alignItems: 'center', justifyContent: 'center'},
});
