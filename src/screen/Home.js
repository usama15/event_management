import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <Image resizeMode='center' style={styles.img} source={require('../assets/WhatsApp_Image_2021-10-11_at_9.31.22_PM-removebg-preview.png')}/>
        </View>
        <View style={styles.card}>
          <Text style={styles.h2}>Welcome</Text>
          <View style={styles.grp}>
            <Button
              style={styles.btn}
              mode="contained"
              onPress={() => navigation.navigate('ventorLogin')}
            >
              Vendor Login
            </Button>
            <Button
              style={styles.btn}
              mode="contained"
              onPress={() => navigation.navigate('MemberLogin')}
            >
              Member Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  h1: {
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    marginTop: '15%',
    color: '#ffbc03',
  },
  h2: {
    padding: 20,
    textAlign: 'center',
    fontSize: 29,
    marginTop: '5%',
    color: 'white',
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#ffbc03',
    width: '90%',
    height: 300,
    alignSelf: 'center',
    marginTop: '-20%',
    marginBottom: '10%',
  },
  grp: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    width: '50%',
    marginTop: '5%',
    backgroundColor: '#070707',
  },
  img:{
    width:'100%',
    marginTop:'-10%',
  },
});

export default Home;