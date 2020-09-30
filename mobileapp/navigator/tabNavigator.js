import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import * as StackNavigators from './stackNavigator';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator shifting={true}>
    <Tab.Screen
      name="Home"
      component={StackNavigators.HomeStack}
      options={{
        tabBarIcon: ({color}) => {
          return <Icon name="ios-home" size={26} color={color} />;
        },
        tabBarColor: '#156cdd',
      }}
    />
    <Tab.Screen
      name="Broadcast"
      component={StackNavigators.BroadcastStack}
      options={{
        tabBarIcon: ({color}) => {
          return <Icon name="radio-outline" size={24} color={color} />;
        },
        tabBarColor: '#9f86c0',
      }}
    />
    <Tab.Screen
      name="Emergency"
      component={StackNavigators.EmergencyStack}
      options={{
        tabBarIcon: ({color}) => {
          return <Icon name="alert-circle-outline" size={24} color={color} />;
        },
        tabBarColor: '#a85232',
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
