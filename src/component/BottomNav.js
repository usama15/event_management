import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import MainScreen from './MainScreen';
import AddtoCart from "./AddtoCart";
import Profile from "./Profile";

export default function BottomNav() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      activeColor="#2292d4"
      initialRouteName="MainScreen"
      barStyle={{backgroundColor: 'black'}}>
      <Tab.Screen
        name="AddtoCart"
        component={AddtoCart}
        options={{
          headerMode: 'none',
          headerShown: false,
          tabBarLabel: 'Cart',
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
        component={MainScreen}
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