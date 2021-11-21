import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screen/Splash'
import MemberLogin from "./src/component/MemberLogin";
import MemberSignUp from "./src/component/MemberSignup";
import BottomNav from "./src/component/BottomNav";
import MainScreen from "./src/component/MainScreen";
import Home from "./src/screen/Home";
import Banquet from "./src/screen/Banquet";
import Hall from "./src/screen/Hall";
import Lawn from "./src/screen/Lawn";
import Caterers from "./src/screen/Caterers";
import VentorSignUp from "./src/component/VentorSignup";
import VentorLogin from "./src/component/VentorLogin";
import VBottomNav from './src/component/VBottomNav'
import AllPackage from "./src/component/AllPackage";
import Order from "./src/component/Order";
import UserOrder from './src/component/UserOrder';
const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="MemberLogin"
          component={MemberLogin}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="MemberSignup"
          component={MemberSignUp}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="banquet"
          component={Banquet}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="hall"
          component={Hall}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="lawn"
          component={Lawn}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="caterers"
          component={Caterers}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="ventorSignup"
          component={VentorSignUp}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="ventorLogin"
          component={VentorLogin}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="vBottomNav"
          component={VBottomNav}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="AllPackage"
          component={AllPackage}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen
          name="UserOrder"
          component={UserOrder}
          options={{ headerMode: 'none', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
