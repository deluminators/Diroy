import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as DrawerNavigator from './drawerNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/user/AuthScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator name="main">
        <Stack.Screen
          options={{headerShown: false}}
          name="Logging In"
          component={StartupScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#240b36',
            },
            headerTintColor: '#fff',
          }}
          name="Signin"
          component={AuthScreen}
        />

        <Stack.Screen
          name="Logged In"
          options={{headerShown: false}}
          component={DrawerNavigator.DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
