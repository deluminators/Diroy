/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';

const DeviceComp = (props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('white')}>
      <View
        style={{
          width: '80%',
          backgroundColor: 'black',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 5,
          marginTop: 10,
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          {props.name}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const Sucess = (props) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const devices = useSelector((state) => state.contacts.devices);
  console.log(devices);
  useEffect(() => {
    const x = [
      'Checking your network availability...',
      'Finding Devices near you...',
    ];
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);
    let i = 0;
    let j = 0;
    const interval = setInterval(() => {
      if (i > x[j].length - 1) {
        setText('');
        i = 0;
        j++;
      }

      if (j > x.length - 1) {
        clearInterval(interval);
        setText('Broadcasting your location...');
      } else {
        setText((pre) => pre + x[j][i]);
        i++;
      }
    }, 70);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  let show = 'Your location broadcasted successfully';

  if (props.route.params) {
    show = `Your location sent successfully to device with key ${props.route.params.key}`;
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 20,
          textAlign: 'center',
        }}>
        {loading ? text : show}
      </Text>
      {loading ? <ActivityIndicator color="black" size="large" /> : null}
      {loading || props.route.params
        ? null
        : devices.map((el, index) => (
            <DeviceComp name={el.name ? el.name : el.SSID} key={index + ''} />
          ))}
    </View>
  );
};

export default Sucess;
const styles = StyleSheet.create({
  screen: {alignItems: 'center', justifyContent: 'center'},
});
