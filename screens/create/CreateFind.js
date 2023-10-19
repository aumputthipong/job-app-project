import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity,Image} from "react-native";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
const CreateFind = ({ route, navigation }) => {
  

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const[image,setImage]= useState(null);
  useEffect(()=>{
    (async()=>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  },[]);

  const pickImage = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTpyes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,3],
      quality:1,
    });

    console.log(result);
    if(!result.canceled){
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
  };
  if(hasGalleryPermission ===false){
    return <Text>No access To Internal Storage</Text>
  }
   

  
return (
  // <View style={styles.screen}>
  //     {/* email */}
  // <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
  //   <Text style={{ ...styles.text, ...{} }}>ชื่อโพส</Text>
  // </View>
  <View style={{flex:1,justifyContent:'center'}}>
  <Button title="Pick Image" onPress={()=> pickImage() } />
    {image && <Image source={{uri:image}} style={{flex:1/2}} />}

  </View>
  /* <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    // จำนวนตัวอักษรมากสุด
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
    //...เพิ่ม property value และ onChangeText...
    // value={enteredValue}
    // onChangeText={numberInputHandler}
  /> */





  

//  <TouchableOpacity style={styles.button}
//   onPress={() => {
//     navigation.navigate("Login");
//   }}>
//     <Text style={{...styles.text,...{alignSelf:"center",}}}>โพสกหกห</Text>
//   </TouchableOpacity>
// </View>
);





};

const styles = StyleSheet.create({
  screen: {
    paddingTop:"10%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: "85%",
    paddingHorizontal: 10,
    height: 40,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign: "left",
    marginLeft: 15,
    backgroundColor: "white",
  },
  text: {
    textAlign: "left",
    fontSize: 15,
    
  },
  button: {
    marginVertical:10,  
    backgroundColor: "#BEBDFF",
    color: "red",
    width:"50%",
    height:"5%",
    borderRadius:10,
    paddingTop:"1.5%"
  },
  postRow: {
    flexDirection: "row",
    // backgroundColor:"red",
  },
  bgImage: {
    // width: "85%",
    // height: "95%",
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
});

export default CreateFind;
