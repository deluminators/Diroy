import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import LocationScreen from '../screens/Home/Location';
import BroadcastHome from '../screens/Broadcast/Home';
import SuccessScreen from '../screens/Broadcast/successPage';
import EmergencyScreen from '../screens/emergency/home';
import ContactsScreen from '../screens/emergency/contacts';
import UserScreen from '../screens/user/userScreen';
import FleetManagementScreen from '../screens/sidebar/flletmanagement';
import AllowScreen from '../screens/sidebar/allowinfo';
import FindLocationScreen from '../screens/sidebar/findlocation';
import RegisterVehicleScreen from '../screens/sidebar/registerVehicle';

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#135dbd'},
    }}>
    <Stack.Screen name="Diroy" component={HomeScreen} />
    <Stack.Screen name="Calliberate Your Location" component={LocationScreen} />
  </Stack.Navigator>
);

export const BroadcastStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Broadcast Location" component={BroadcastHome} />
    <Stack.Screen name="Broadcasting..." component={SuccessScreen} />
  </Stack.Navigator>
); //#824027

export const EmergencyStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#824027'},
    }}>
    <Stack.Screen name="Emergency" component={EmergencyScreen} />
    <Stack.Screen name="Contacts" component={ContactsScreen} />
  </Stack.Navigator>
);

export const UserStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Your Profile" component={UserScreen} />
  </Stack.Navigator>
);

export const FindLocationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Find Location" component={FindLocationScreen} />
  </Stack.Navigator>
);

export const AllowInforStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Allow Info" component={AllowScreen} />
  </Stack.Navigator>
);

export const FleetManagementStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Manage Fleet" component={FleetManagementScreen} />
  </Stack.Navigator>
);

export const RegisterVehicleStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Register Vehicle" component={RegisterVehicleScreen} />
  </Stack.Navigator>
);
