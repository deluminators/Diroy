import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

// import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.replace('Signin');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, user, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !user) {
        props.navigation.replace('Signin');
        return;
      }

      // const expirationTime = expirationDate.getTime() - new Date().getTime();
      console.log(user, expirationDate);
      props.navigation.replace('Logged In');
      dispatch(authActions.authenticate(user, token, expirationDate));
    };

    tryLogin();
  }, [dispatch, props.navigation]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
