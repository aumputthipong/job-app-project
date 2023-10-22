import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity,Image,ScrollView} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import firebase from '../../database/firebaseDB';
const CreateFind = ({ route, navigation }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [position, setPosition] = useState('');
  const [agency, setAgency] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');
  const [email, setEmail] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [phone ,setPhone] = useState('');
  const [wage ,setWage] = useState(0);
  const [welfareBenefits ,setWelfareBenefits] = useState([]);
  const [workperiod ,setWorkperiod] = useState('');

  


  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Permission to access media library is required.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // const imageUrl = result.assets[0].uri;
    }
  };

  const uploadImage = async () => {
    if (image) {
      setUploading(true);
      const response = await fetch(image);
      const blob = await response.blob();
      const imageName = `${Date.now()}`;
      const ref = firebase.storage().ref().child(`images/${imageName}`);
  
      try {
        await ref.put(blob);
        const imageUrl = await ref.getDownloadURL();
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error uploading image: ', error);
      }
  
      setUploading(false);
      setImage(null);
    }
  };

 

  const createPost = async () => {
    try {
      // 1. อัปโหลดรูปภาพ
      if (image) {
        setUploading(true);
        const response = await fetch(image);
        const blob = await response.blob();
        const imageName = `${Date.now()}`;
        const ref = firebase.storage().ref().child(`images/${imageName}`);
  
        await ref.put(blob);
        const imageUrl = await ref.getDownloadURL();
  
        // 2. สร้าง post object พร้อม URL รูปภาพ
        const post = {
          jobTitle,
          position,
          agency,
          attributes,
          welfareBenefits,
          imageUrl,
          // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการใน post object
        };
  
        // 3. สร้างโพสต์โดยใช้ post object ที่สร้างขึ้น
        const postRef = firebase.firestore().collection('JobPosts');
        const docRef = await postRef.add(post);
  
        console.log('Post created with ID: ', docRef.id);
  
        // 4. Navigate ไปยังหน้าที่ต้องการหลังจากสร้างโพสต์เรียบร้อย
        navigation.navigate('FindJobScreen');
      } else {
        // ไม่มีรูปภาพที่ต้องการอัปโหลด
        console.error('No image to upload');
      }
    } catch (error) {
      console.error('Error creating post: ', error);
    }
  };
  
  
  
  
  
  
  
  

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
    onChangeText={(jobTitle) => setJobTitle(jobTitle)}
    maxLength={20}
    placeholder="ชื่อโพส"
  /> 
  <View>
  {image && <Image source={{ uri: image }} style={styles.bgImage} />}

<TouchableOpacity style={styles.button} onPress={pickImage}>  
  <Text style={styles.buttonText}>เลือกรูปภาพ</Text>
</TouchableOpacity>

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
    onChangeText={(position) => setPosition(position)}
    maxLength={20}
    placeholder="ชื่อผู้ใช้"
  /> 
   {/* หน่วยงาน*/}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
    <Text style={{ ...styles.text, ...{} }}>หน่วยงาน</Text>
  </View>
   <TextInput
    style={styles.input}
    blurOnSubmit
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="number-pad"
    onChangeText={(agency) => setAgency(agency)}
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
    onPress={createPost}>
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
  button: { 
    backgroundColor: "#5A6BF5",
    width:"50%",
    height: 40,
    borderRadius:10,
    padding:"2.5%",
    alignItems: "center",
    alignSelf:"center",
  },
});

export default CreateFind;
