import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../components/Button';
import HeaderButton from '../../components/HeaderButton';
import Backdrop from '../../components/Backdrop';
import Modal from '../../components/Modal';

const Home = (props) => {
  let pickup = useSelector((state) => state.location.pickup);
  if (pickup) {
    pickup = pickup.url;
  }
  const [broadcast, setBroadcast] = useState(false);
  const [specific, setSpecific] = useState(false);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-menu"
            color="black"
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
    <View style={styles.container}>
      <Text style={styles.text}>Your current location</Text>
      <View style={styles.mapContain}>
        {pickup ? (
          <Image
            source={{uri: pickup}}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <Text>Not selected yet</Text>
        )}
      </View>
      <Button onPress={() => setBroadcast(true)}>Broadcast</Button>
      <Button onPress={() => setSpecific(true)}>Send to specific</Button>
      <Backdrop
        press={() => {
          setBroadcast(false);
          setSpecific(false);
        }}
        show={specific || broadcast}
      />
      <Modal
        show={specific}
        title="Your location will be shown to a specific device with identifier key, entered by you"
        specific={true}
        cancel={() => setSpecific(false)}
        navigation={props.navigation}
      />
      <Modal
        show={broadcast}
        title="Broadcasting will show your location to nearby devices, are you sure?"
        cancel={() => setBroadcast(false)}
        navigation={props.navigation}
      />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  mapContain: {
    width: '100%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 300,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 5,
  },
});
