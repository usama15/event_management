import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import firestore from '@react-native-firebase/firestore';
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";


const UserOrder = () => {
  const [post, setPost] = React.useState([]);
  const userData = useSelector(state => state.user.initialState);
  // const dta = userData.map(data => (data.email))
  React.useEffect(() => {
    firestore().collection('Order').onSnapshot(snapshot => {
      const newPost = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPost(newPost);
    });
  }, [])
  return (
    <SafeAreaView>
      <AppBar />
      <ScrollView>
        <View style={{ marginBottom: '20%', }}>
            <Text style={styles.text}>Order History</Text>
          {post.map(data => (
              data.data[0].userEmail === userData[0].email ? 
            <Card style={styles.card}>
              <Text style={styles.text}>Name: {data.data[0].user}</Text>
              <Text style={styles.text1}>User Email: {data.data[0].userEmail}</Text>
              <Text style={styles.text1}>Date: {data.date}</Text>
              <Text style={styles.text1}>Product Name: {data.data[0].name}</Text>
              <Text style={styles.text1}>Contact No: {data.data[0].userPhone}</Text>
              <Text style={styles.text1}>Rate: {data.data[0].price}</Text>
              <Text style={styles.text1}>Total Rate: {data.data[0].TotalPrice}</Text>
            </Card>
            : null
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 200,
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
    marginTop: '5%',
  },
  text1: {
    marginLeft: '7%',
    color: 'black',
  },
});
export default UserOrder;

