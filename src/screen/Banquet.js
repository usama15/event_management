import React from 'react';
import {
  Image, ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppBar from '../component/AppBar';
import {Button, Card} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from "react-redux";
import {addToCart} from "../store/cartReducer";

const Banquet = () => {
  const [post, setPost] = React.useState([]);
  const dispatch = useDispatch();
 React.useEffect( () => {
    firestore()
      .collection('products')
      .onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(newPost.filter(x => x.catagory == 'Banquet'));
      });
  }, []);
  console.log(post)
  return (
    <SafeAreaView>
      <ScrollView>
        <AppBar />
        <View style={styles.main}>
         <Card style={styles.hcard}>
            <ImageBackground
              style={{width: '100%', opacity:0.7,}}
              resizeMode={'cover'}
              borderRadius={10}
              source={require('../assets/banquite.jpg')}>
              <Text style={styles.head}>Wedding Banquet List</Text>
            </ImageBackground>
          </Card>
          {post.map(post => (
           <Card style={styles.card}>
              <Image
                style={styles.img}
                resizeMode="stretch"
                source={{uri: post.image}}
              />
              <Text style={styles.text}>Name: {post.name}</Text>
                <Text style={styles.text1}>Owner Name: {post.username}</Text>
                <Text style={styles.text1}>Type: {post.catagory}</Text>
                <Text style={styles.text1}>Contact NO: {post.contactNo}</Text>
                <Text style={styles.text1}>Rate Per Head: {post.price}</Text>
                <Text style={styles.text1}>Description: {post.description}</Text>
             <Button style={styles.btn}
                     mode='contained'
                    onPress={() => {dispatch(addToCart(post))}}
             >
               Add To cart
             </Button>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main:{
    marginBottom:'5%',
  },
  card: {
    width: '90%',
    height: 480,
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
    color:'black',
  },
  img: {
    height: '55%',
    width: '50%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 28,
    marginLeft: '5%',
    color:'black',
  },
  text1: {
    marginLeft: '7%',
    color:'black',
  },
  btn:{
    width: '50%',
    alignSelf:'center',
    backgroundColor:'#2292d4',
    marginTop:'5%',
  }
});
export default Banquet;