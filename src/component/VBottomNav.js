import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Profile from "./Profile";
import AddProduct from "./AddProduct";
import AllPackage from "./AllPackage";
import VentorHome from "./VentorHome";

export default function BottomNav() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      activeColor="#ffbc03"
      initialRouteName="MainScreen"
      barStyle={{backgroundColor: 'black'}}>
      <Tab.Screen
        name="AddtoCart"
        component={AddProduct}
        options={{
          headerMode: 'none',
          headerShown: false,
          tabBarLabel: 'Add Package',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MainScreen"
        component={VentorHome}
        options={{
          headerMode: 'none',
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Package"
        component={Profile}
        options={{
          headerMode: 'none',
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}