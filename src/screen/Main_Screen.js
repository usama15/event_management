import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const Main_Screen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.body}>
          <Image
            style={styles.sectionContainer}
            source={require('../assets/WhatsApp_Image_2021-10-11_at_9.31.22_PM-removebg-preview.png')}
          />
          <View style={styles.secondText}>
            <ActivityIndicator size="large" color="#2292d4" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: 750,
    justifyContent: 'center',
  },
  sectionContainer: {
    width: '80%',
    height: 200,
    alignSelf: 'center',
  },
  secondText: {
    marginTop: '10%',
  },
});

export default Main_Screen;