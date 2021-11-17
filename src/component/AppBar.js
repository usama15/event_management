import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {Image, Linking, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../store/userReducer';
// import {loginTrainer} from "../../store/trainerReducer";

const AppBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Appbar.Header theme={{colors: {primary: '#ffbc03'}}}>
      <Appbar.Action icon="menu" />
      <Appbar.Content title='Event Management'/>
      <Appbar.Action icon="bell" 
      onPress={() => navigation.navigate('UserOrder')}
      />
      <Appbar.Action
        icon="logout"
        onPress={async () => {
          await auth().signOut();
          dispatch(loginUser([]));
          // dispatch(loginTrainer([]));
          await AsyncStorage.setItem('@login', 'false').then(() =>
            navigation.navigate('Home'),
          );
        }}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '50%',
    height: '100%',
    marginLeft: '10%',
    marginRight: '14%',
  },
});

export default AppBar;