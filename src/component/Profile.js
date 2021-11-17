import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar, Divider, Button} from 'react-native-paper';
import AppBar from './AppBar';
import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.initialState);
  const ventorData = useSelector(state => state.user.initialState);
  return (
    <SafeAreaView>
      <ScrollView>
        <AppBar />

        {userData.map(userData => (
            userData.category === 'Member' ?
          <View>
            <View style={styles.img}>
              <Avatar.Image
                size={100}
                source={require('../assets/avatar.png')}
              />
              <Text style={styles.Avttex}>{userData.name}</Text>
            </View>
            <Divider style={styles.dev} />
            <View style={styles.NameD}>
              <Text style={styles.text}>Name</Text>
              <Text style={styles.text}>{userData.name}</Text>
            </View>
            <Divider style={styles.dev} />
            <View style={styles.NameD}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.text}>{userData.email}</Text>
            </View>
            <Divider style={styles.dev} />
            <View style={styles.NameD}>
              <Text style={styles.text}>Gender</Text>
              <Text style={styles.text}>{userData.gvalue}</Text>
            </View>
            <Divider style={styles.dev} />
            <View style={styles.NameD}>
              <Text style={styles.text}>Phone No</Text>
              <Text style={styles.text}>{userData.phone}</Text>
            </View>
            <Divider style={styles.dev} />
            <Button
              style={styles.btn}
              mode="contained"
              onPress={async () => {
                await auth().signOut();
                await navigation.navigate('Home');
              }}>
              LogOut
            </Button>
          </View> : userData.category === 'Vendor' ?
                  <View>
            <View style={styles.img}>
              <Avatar.Image
                size={100}
                source={require('../assets/avatar.png')}
              />
              <Text style={styles.Avttex}>{userData.name}</Text>
            </View>
            <Divider style={styles.dev} />
            <View style={styles.NameD}>
              <Text style={styles.text}>Name</Text>
              <Text style={styles.text}>{userData.name}</Text>
            </View>
            <Divider style={styles.dev} />
            <View style={styles.NameD}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.text}>{userData.email}</Text>
            </View>
            <Divider style={styles.dev} />
            {/*<View style={styles.NameD}>*/}
            {/*  <Text style={styles.text}>Type</Text>*/}
            {/*  <Text style={styles.text}>{userData.gvalue}</Text>*/}
            {/*</View>*/}
            {/*<Divider style={styles.dev} />*/}
            <View style={styles.NameD}>
              <Text style={styles.text}>Phone No</Text>
              <Text style={styles.text}>{userData.phone}</Text>
            </View>
            <Divider style={styles.dev} />
            <Button
              style={styles.btn}
              mode="contained"
              onPress={async () => {
                await auth().signOut();
                await navigation.navigate('Home');
              }}>
              LogOut
            </Button>
          </View> : null
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    marginTop: '5%',
    marginLeft: '5%',
    flexDirection: 'row',
  },
  Avttex: {
    marginLeft: '3%',
    alignSelf: 'center',
    fontSize: 32,
    color:'black',
  },
  dev: {
    marginTop: '5%',
  },
  NameD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 23,
    marginTop: '5%',
    color:'black',
  },
  btn: {
    marginTop: '10%',
    width: '40%',
    alignSelf: 'center',
    backgroundColor:'#ffbc03',
  },
});

export default Profile;