import React from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image,  } from "react-native";
import AppBar from "./AppBar";
import { useSelector } from 'react-redux';
import { TextInput,Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const AddtoCart = () => {
   const userData = useSelector(state => state.user.initialState);
  const cartData = useSelector(state => state.cart.initialState.cartData);
  const [count , setCount] = React.useState(0)
  const [totalCount, setTotalCount] = React.useState([])
  const [disable, setDisbale] = React.useState(true)

    const TotalSum = (price, id, image, name,contactNo ) => {
         setDisbale(false)
      const newPrice = price * count
      firestore().collection('rate').doc(id).set({
        price: price,
        id: id,
        name: name,
        image: image,
        TotalPrice: newPrice,
        contact: contactNo,
        user: userData[0].name,
        userEmail: userData[0].email,
        userPhone: userData[0].phone
      })
   }

   React.useEffect(() => {
     firestore().collection('rate').onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTotalCount(newPost);
      });
   }, [])

  const CheckOut = () => {
    setDisbale(true)
    firestore().collection('Order').doc().set({
      data: totalCount,
    }).then(
        firestore()
  .collection('rate')
   .get()
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
})
    )
  }
console.log(cartData[0])
  return (
    <SafeAreaView>
      <AppBar />
      <ScrollView>
        <View style={styles.main}>
          {cartData.length ? (
            <View
              style={styles.card}>
              <Image style={styles.img} source={{ uri: cartData[0].image }} />
              <View style={{width:'50%',}}>
                <Text style={styles.text}>{cartData[0].name}</Text>
                <Text style={styles.text}>{cartData[0].price}</Text>
                <Text style={styles.text}>{cartData[0].contactNo}</Text>
              </View>
              <View style={styles.btn_count}>
                  <TextInput mode='outlined' label='Count' style={styles.count_text} keyboardType='numeric' onChangeText={value => setCount(value,cartData[0].id)}/>
                  <Button onPress={() => TotalSum(cartData[0].price, cartData[0].id, cartData[0].image, cartData[0].name, cartData[0].contactNo)}>Add</Button>
                  {totalCount.map(data => data.id == cartData[0].id ? (
                  <Text style={{color:'black',}}>{data.TotalPrice}</Text>
                  ):null)}
              </View>
            </View>
          ): <Text style={styles.text}>NO data in Cart</Text>}

        </View>
         <Button mode='contained' style={styles.btn} disabled={disable} onPress={() => CheckOut()}>Process To CheckOut</Button>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: 'row',
    width: '95%',
    height: 150,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 10,
    backgroundColor: '#ece6e6',
  },
  main: {
    marginBottom: '18%',
  },
  img: {
    width: '30%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    color: 'black',
    textAlignVertical: 'center',
    marginLeft: '5%',
  },
  btn_count:{
      color:'black',
      width:'13%',

  },
    count_text:{
      color:'black',
        width:'150%',
        height:50,
    },

  btn:{
    backgroundColor:'#ffbc03',
    color:'black',
  }
})

export default AddtoCart;