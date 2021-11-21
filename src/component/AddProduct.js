import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Title,
  Button,
  TouchableOpacity,
  Content,
  Platform,
  ScrollView,
  SafeAreaView,
  // TextInput
} from "react-native";
import database from "@react-native-firebase/database";
import firestore from '@react-native-firebase/firestore'
import ActionButton from "react-native-action-button";
import { Container, Header, Body, Left, Right, Select, CheckIcon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
// import { v4 as uuidv4 } from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, RadioButton } from 'react-native-paper';
import { useSelector } from "react-redux";

const AddProduct = ({ navigation }) => {
  const userData = useSelector(state => state.user.initialState);
  const [varuserName, setvaruserName] = useState("");
  const [varproductName, setvarproductName] = useState("");
  const [varproductPrice, setvarproductPrice] = useState("");
  const [varproductContactNo, setvarproductContactNo] = useState("");
  const [varproductArea, setvarproductArea] = useState("");
  const [varproductDescription, setvarproductDescription] = useState("");
  // const [productID, setproductID] = useState(uuidv4())
  const [newimage, setnewimage] = useState("");
  const [Img, setImg] = useState("");
  const [ImgURL, setImgURL] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [rvalue, setRvalue] = React.useState(null);
  const [items, setItems] = useState([
    { label: 'Hall', value: 'Hall' },
    { label: 'Banquet', value: 'Banquet' },
    { label: 'Lawn', value: 'Lawn' },
    { label: 'Caterers', value: 'Caterers' },
  ]);
  const uploadImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async (image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImg(imageUri);
      let imgName = image.path.substring(image.path.lastIndexOf("/") + 1);
      // console.log(imgName);

      // let ext = imgName.split(".").pop();
      // let name = productID;
      // let newname = name + "." + ext;
      // console.log(ext, name, newname);

      const reference = storage().ref(imgName);
      setnewimage(imgName);
      try {
        reference.putFile(imageUri).then(() => {
          alert("Image Stored");
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  async function getImageURL() {
    return await storage()
      .ref(newimage)
      .getDownloadURL()
      .then((uri) => {
        return uri;
      })
      .catch((e) => console.log(e));
  }

  function AddProduct() {
    if (
      varuserName === "" &&
      varproductName === "" &&
      varproductPrice === "" &&
      varproductContactNo === "" &&
      value === "" &&
      varproductDescription === ""
    ) {
      alert("Enter Details To Add Product!");
    } else if (varuserName === "") {
      alert("Enter Your Name!");
    } else if (varproductName === "") {
      alert("Enter Product Name!");
    } else if (varproductPrice === "") {
      alert("Enter Product Price!");
    } else if (varproductContactNo === "") {
      alert("Enter Contact Number!");
    }
    else if (value === "") {
      alert("Select Product Catagory!");
    } else if (varproductDescription === "") {
      alert("Enter Product Description!");
    } else if (Img === "") {
      alert("Photo Required!");
    } else {

      getImageURL()
        .then((imgurl) => {
          firestore()
            .collection("products")
            .doc()
            .set({
              // id: productID,
              useremail:userData[0].email,
              username: varuserName,
              name: varproductName,
              price: varproductPrice,
              contactNo: varproductContactNo,
              catagory: value,
              description: varproductDescription,
              image: imgurl,
            })
            .then({
              setvaruserName: setvaruserName(''),
              setvarproductName: setvarproductName(''),
              setvarproductPrice: setvarproductPrice(''),
              setvarproductContactNo: setvarproductContactNo(''),
              setvarproductArea: setvarproductArea(''),
              setValue: setValue(''),
              setvarproductDescription: setvarproductDescription(''),
              setImgURL: setImgURL(''),
            })
            .then(() => {
              alert("Data Stored");
              navigation.navigate("MainScreen");
            });
        })
        .catch((e) => console.log(e));
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.logo1} > Add Product </Text>
          <View style={styles.dropview} >
            <DropDownPicker
              style={[styles.drop, { color: '#D49A9A', width: '70%', }]}
              dropDownContainerStyle={{
                width: '70%',
                borderRadius: 10,
                paddingLeft: '5%',
              }}
              placeholderStyle={{
                marginLeft: '5%',
              }}
              dropDownDirection="BOTTOM"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <View style={[styles.inputView, { marginTop: '14%', }]}>
            <TextInput
              style={styles.textInput1}
              label="Owner Name"
              theme={{ colors: { text: 'black', primary: '#D49A9A' } }}
              onChangeText={(text) => setvaruserName(text)}
              text={varuserName}
              mode='outlined'
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput1}
              label="Product Name"
              theme={{ colors: { text: 'black', primary: '#D49A9A' } }}
              onChangeText={(text) => setvarproductName(text)}
              text={varproductName}
              mode='outlined'
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput1}
              label='Product Price'
              theme={{ colors: { text: 'black', primary: '#D49A9A' } }}
              onChangeText={(text) => setvarproductPrice(text)}
              text={varproductPrice}
              keyboardType="numeric"
              mode='outlined'
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput1}
              label="Contact number"
              theme={{ colors: { text: 'black', primary: '#D49A9A' } }}
              onChangeText={(text) => setvarproductContactNo(text)}
              text={varproductContactNo}
              keyboardType="numeric"
              mode='outlined'
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput1}
              label="Product description"
              theme={{ colors: { text: 'black', primary: '#D49A9A' } }}
              onChangeText={(text) => setvarproductDescription(text)}
              text={varproductDescription}
              mode='outlined'
            />
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.photobtn}
              onPress={uploadImg}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="md-camera-outline" size={30} color='#2292d4' />
                <Text style={{ fontWeight: "bold", color: '#2292d4', marginTop: 6, paddingLeft: 6 }}>Choose Photo</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginBtn1}
            onPress={() => AddProduct()}>
            <Text style={({ fontfamily: 'poppins' }, { fontWeight: 'bold' }, { color: 'black', fontSize: 18 })}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    height: 800,
    backgroundColor: '#2292d4',
  },
  lab: {
    marginTop: '2%',
    color: 'white',
  },
  sec: {
    marginHorizontal: '100%',
  },
  gen: {
    marginHorizontal: '8%',
    fontSize: 18,
    marginTop: '2%',
    color: 'white',
  },
  radio: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: '10%',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  inputView: {
    // backgroundColor: "white",
    alignItems: 'center',
    // flex:1,
    position: 'relative',
  },
  textInput1: {
    width: "70%",
    // flex:1,

  },
  drop: {
    marginTop: '1%',
    position: 'absolute',
    // width:'70%',
  },
  dropview: {
    marginLeft: '15%',
    width: '100%',
  },
  loginBtn1: {
    width: "50%",
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowRadius: 10,
    backgroundColor: "#f8f8f8",
    shadowColor: "#87C7D8",
    shadowOpacity: 1,
    elevation: 3,
    shadowOffset: { width: 1, height: 5 },
    marginBottom: '18%',
  },
  logo1: {
    fontSize: 30,
    color: "white",
    marginTop: 50,
    shadowColor: '#D49A9A',
    textAlign: 'center',
    marginBottom: '10%',
  },
  photobtn: {
    width: '70%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#87C7D8',
    shadowOpacity: 3,
    elevation: 3,
    shadowOffset: { width: 1, height: 2 },
  },
  btn: {
    alignItems: 'center',
  },
});

export default AddProduct;
