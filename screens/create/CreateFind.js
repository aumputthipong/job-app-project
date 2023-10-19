import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity,Image,ScrollView} from "react-native";
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
      aspect:[12,8],
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
    return  alert("ไม่ได้รับอนุญาติให้เข้าถึงรูปภาพ");
  }
   
return (
  <ScrollView style={{}}>

  <View style={styles.screen}>
      {/* JobTitle */}
  <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>ชื่อโพส</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อโพส"
  /> 
  <View>
  <Button title="Pick Image" onPress={()=> pickImage() } />
    {image && <Image source={{uri:image}} style={styles.bgImage} />}

  </View>

   {/* ตำแหน่ง*/}
  <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>ตำแหน่งที่รับ</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  /> 
   {/* ตำแหน่ง*/}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>หน่วยงาน</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  />
  {/* ประเภทการจ้าง (ควรเป็นchoice dropdown ,checkbox)รายเดือน,รายวัน,ต่อชิ้นงาน */}
  <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>ประเภทการจ้าง</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  /> 
   {/* ค่าจ้าง*/}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>ค่าจ้าง</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  /> 
  {/*welfareBenefits*/}
<View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>สวัสดิการ</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  /> 
  <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>อีเมล</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  /> 
  <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>เบอร์โทร</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  /> 


  

  <TouchableOpacity style={styles.button}
   onPress={() => {
     navigation.navigate("Login");
   }}>
     <Text style={{...styles.text,...{alignSelf:"center",}}}>สร้างโพส</Text>
   </TouchableOpacity>
 </View>
 </ScrollView>
);





};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop:"10%",
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
    width: 250,
    height: 180,
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
});

export default CreateFind;
