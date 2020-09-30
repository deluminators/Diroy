import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as StackNavigators from './stackNavigator';
import TabNavigator from './tabNavigator';
import CustomDrawer from '../components/customDrawer';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="Diroy" component={TabNavigator} />
    <Drawer.Screen
      name="Manage Fleet"
      component={StackNavigators.FleetManagementStack}
    />
    <Drawer.Screen
      name="Find Location"
      component={StackNavigators.FindLocationStack}
    />
    <Drawer.Screen
      name="Allow Info"
      component={StackNavigators.AllowInforStack}
    />
    <Drawer.Screen
      name="Register Vehicle"
      component={StackNavigators.RegisterVehicleStack}
    />
    <Drawer.Screen name="Your Profile" component={StackNavigators.UserStack} />
  </Drawer.Navigator>
);
