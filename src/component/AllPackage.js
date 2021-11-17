import React from 'react';
import {
  Image, ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppBar from './AppBar';
import { Card } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";

const AllPackage = () => {
  const [post, setPost] = React.useState([]);
  const userData = useSelector(state => state.user.initialState);
  const user = userData.map(data => (data.name))
  React.useEffect(() => {
    firestore()
      .collection('products')
      .onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(newPost.filter(x => x.username === user));
      });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <AppBar />
        <View>
          {post.map(post => (
            <Card style={styles.card}>
              <Image
                style={styles.img}
                resizeMode="stretch"
                source={{ uri: post.image }}
              />
              <Text style={styles.text}>Name: {post.name}</Text>
              <Text style={styles.text1}>Owner Name: {post.username}</Text>
              <Text style={styles.text1}>Type: {post.catagory}</Text>
              <Text style={styles.text1}>Contact NO: {post.contactNo}</Text>
              <Text style={styles.text1}>Rate: {post.price}</Text>
              <Text style={styles.text1}>Description: {post.description}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 400,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 10,
  },
  hcard: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '2%',
  },
  head: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },
  img: {
    height: '60%',
    width: '50%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 28,
    marginLeft: '5%',
    color: 'black',
  },
  text1: {
    marginLeft: '7%',
    color: 'black',
  },
});
export default AllPackage;