import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userReducer';

const VentorLogin = () => {
  const Navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [post, setPost] = React.useState([]);
  const dispatch = useDispatch();
  const userLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        firestore()
          .collection('Ventor')
          .onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            dispatch(loginUser(newPost.filter(x => x.email === email)));
            setPost(newPost.filter(x => x.email === email));
          }),
      )
      .then(async () => {
        Navigation.navigate('vBottomNav');
        // if (post) {
        //   post.map(post => {
        //     if (post.email !== email) {
        //       alert('You are not Member');
        //     } else if (post.email === email) {
        //       Navigation.navigate('BottomNav');
        //       console.log('yoy are member');
        //     }
        //   });
        // }
      })
      .catch(function (e) {
        alert(e);
      });
  };
  // console.log(post)
  return (
    <View style={styles.container1}>
      <Text style={styles.logo1}> Vendor Login </Text>

      <View>
        <Text />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput1}
          label="Email"
          mode="outlined"
          value={email}
          theme={{ colors: { text: 'black', primary: '#0a217a' } }}
          onChangeText={val => setEmail(val)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput1}
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={val => setPassword(val)}
          maxLength={15}
          theme={{ colors: { text: 'black', primary: '#0a217a' } }}
          secureTextEntry={true}
        />
      </View>
      <View>
        <Text />
      </View>
      <View>
        <Text />
      </View>

      <TouchableOpacity style={styles.loginBtn1} onPress={() => userLogin()}>
        <Text style={{ fontWeight: 'bold' }}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.signupbtn}>
        <Text style={{ marginRight: '1%',color:'black', }}>Don't have account?</Text>
        <Text onPress={() => Navigation.navigate('ventorSignup')} style={({ fontfamily: 'poppins' }, { fontWeight: 'bold', color:'black', })}>
          SIGNUP
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  loginText: {
    color: '#9D0F15',
    marginTop: 25,
    textAlign: 'center',
    padding: 10,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    // color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  container1: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    // backgroundColor: '#666970',
    // borderRadius: 30,
    width: '80%',
    height: 65,
    marginBottom: 20,
  },

  textInput1: {
    height: 0,
    // flex: 1,
    // padding: 10,
    // marginLeft: 20,
  },

  forgot_button1: {
    height: 30,
    marginBottom: 30,
    fontWeight: '600',
    fontFamily: 'Comic Sans MS',
    color: '#D49A9A',
    fontSize: 15,
  },

  loginBtn1: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowRadius: 10,
    backgroundColor: '#2292d4',
    shadowColor: '#87C7D8',
    shadowOpacity: 3,
    elevation: 3,
    shadowOffset: { width: 1, height: 2 },
  },
  googlebtn: {
    width: '80%',
    height: 50,
    marginTop: 20,
    shadowOpacity: 3,
    elevation: 3,
    shadowOffset: { width: 1, height: 5 },
    borderRadius: 25,
  },
  logo1: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#2292d4',
    marginBottom: 40,
    fontFamily: 'San Francisco',
    shadowColor: '#D49A9A',
  },
  signupbtn: {
    flexDirection: 'row',
    marginTop: '7%',

  },
});

export default VentorLogin;