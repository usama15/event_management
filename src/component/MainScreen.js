import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Appbar from './AppBar';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {
  let navigation = useNavigation();
  return (
    <SafeAreaView>
      <Appbar />
      <ScrollView>
        <View style={styles.main}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('banquet')}
          >
            <ImageBackground
              style={styles.img}
              resizeMode={'cover'}
              borderRadius={10}
              source={require('../assets/banquite.jpg')}>
              <Text style={styles.text}>Wedding Banquet</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('hall')}
          >
            <ImageBackground
              style={styles.img}
              resizeMode={'cover'}
              borderRadius={10}
              source={require('../assets/hall.jpg')}>
              <Text style={styles.text}>Wedding Hall</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('lawn')}
          >
            <ImageBackground
              style={styles.img}
              resizeMode={'cover'}
              borderRadius={10}
              source={require('../assets/lawn.jpg')}>
              <Text style={styles.text}>Wedding Lawn</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('caterers')}
          >
            <ImageBackground
              style={styles.img}
              resizeMode={'cover'}
              borderRadius={10}
              source={require('../assets/Caterers.jpg')}>
              <Text style={styles.text}>Caterers</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 130,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 1,
    elevation: 10,
    shadowOffset: {width: 1, height: 5},
    shadowRadius: 10,
  },
  main: {
    marginBottom: '18%',
  },
  img: {
    height: '100%',
    // opacity: 1,
  },
  text: {
    height: '100%',
    fontSize: 32,
    color: 'white',
    textAlignVertical: 'center',
    marginLeft: '5%',
  },
});

export default MainScreen;