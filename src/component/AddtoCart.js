import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, } from "react-native";
import AppBar from "./AppBar";
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import CalendarPicker from 'react-native-calendar-picker';
import { removeFromCart } from "../store/cartReducer";
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Provider } from 'react-native-paper';

const AddtoCart = () => {
  const Navigation = useNavigation();
  const userData = useSelector(state => state.user.initialState);
  const cartData = useSelector(state => state.cart.initialState.cartData);
  const [count, setCount] = React.useState(0)
  const [totalCount, setTotalCount] = React.useState([])
  const [disable, setDisbale] = React.useState(true)
  const [selectDate, setSelectDate] = React.useState(null)
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const TotalSum = (price, id, image, name, contactNo) => {
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
    const date = (`${selectDate.date()}.${selectDate.month()}.${selectDate.year()}`)
    setDisbale(true)
    firestore().collection('Order').doc().set({
      data: totalCount,
      date: date,
    }).then(
      firestore()
        .collection('rate')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          })
        }).then(dispatch(removeFromCart()))
    )
  }
  const onDateChange = () => {
    CheckOut()
    hideModal()
  }
  return (
    <Provider>
      <SafeAreaView>
        <AppBar />
        <ScrollView>
          <View style={styles.main}>
            {cartData.length ? (
              <View
                style={styles.card}>
                <Image style={styles.img} source={{ uri: cartData[0].image }} />
                <View style={{ width: '50%', }}>
                  <Text style={styles.text}>Name: {cartData[0].name}</Text>
                  <Text style={styles.text}>Price: {cartData[0].price}</Text>
                  <Text style={styles.text}>Phone No: {cartData[0].contactNo}</Text>
                  <TextInput mode='outlined' label='PerHead' style={styles.count_text} keyboardType='numeric' onChangeText={value => setCount(value, cartData[0].id)} />
                </View>
                <View style={styles.btn_count}>
                  <Button style={{ backgroundColor: '#ffbc03', marginBottom:'30%',}} mode='contained' onPress={() => TotalSum(cartData[0].price, cartData[0].id, cartData[0].image, cartData[0].name, cartData[0].contactNo)}>Add</Button>
                  {totalCount.map(data => data.id == cartData[0].id ? (
                    <Text style={{ color: 'black', }}>Total:{data.TotalPrice}</Text>
                  ) : null)}
                </View>
              </View>
            ) : <Text style={styles.text}>NO data in Cart</Text>}

          </View>
          <Button mode='contained' style={styles.btn} disabled={disable}
            // onPress={() => CheckOut()}
            onPress={showModal}
          >Process To CheckOut</Button>
          {/* <Button mode='contained' style={styles.btn}
            // onPress={() => Navigation.navigate('Cal')}
          >Calender</Button> */}
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <CalendarPicker
                onDateChange={val => setSelectDate(val)}
              />
              <Button mode='outlined' style={styles.btn} onPress={() => onDateChange()}>Submit</Button>
            </Modal>
          </Portal>

        </ScrollView>
      </SafeAreaView>
    </Provider>
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
    width: '25%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 17,
    color: 'black',
    textAlignVertical: 'center',
    marginLeft: '5%',
  },
  btn_count: {
    marginTop:'5%',
    color: 'black',
    width: '13%',

  },
  count_text: {
    color: 'black',
    width: '70%',
    height: 50,
  },

  btn: {
    backgroundColor: '#ffbc03',
    color: 'black',
  }
})

export default AddtoCart;