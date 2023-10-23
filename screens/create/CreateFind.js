import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebaseDB';
import { SelectList } from 'react-native-dropdown-select-list'
// Now you can use Firebase services in your component



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

    const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your media library to pick an image.');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const submitPost = async () => {
    const uploadUri = image;
    if (uploadUri) {
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  
      try {
        const response = await fetch(uploadUri);
        const blob = await response.blob();
        const uploadTask = firebase.storage().ref().child(`images/${filename}`).put(blob);
        // abcdes
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle upload progress if needed
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            // Handle upload error
            console.error('Upload Error: ', error);
          },
          () => {
            // Upload completed successfully, get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(async(downloadURL) => {
              // Save the download URL to Firestore or use it as needed
              console.log('File available at', downloadURL);
              const post = {
                jobTitle,
                position,
                agency,
                attributes,
                welfareBenefits,
                imageUrl: downloadURL,
                wage,
                category,
                employmentType,
                // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการใน post object
              };
              const postRef = firebase.firestore().collection('JobPosts');
              const docRef = await postRef.add(post);
              console.log('Post created with ID: ', docRef.id);
              navigation.navigate('FindJobScreen');
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('No image to upload');
    }
  };

  const categorydata = [
    {key:'1', value:'งานบัญชี'},
    {key:'2', value:'งานทรัพยากรบุคคล'},
    {key:'3', value:'งานธนาคาร'},
    {key:'4', value:'งานสุขภาพ'},
    {key:'5', value:'งานก่อสร้าง'},
    {key:'6', value:'งานออกแบบ'},
    {key:'7', value:'งานไอที'},
    {key:'8', value:'งานการศึกษา'},
]
const emptypedata = [
  {key:'1', value:'รายเดือน'},
  {key:'2', value:'รายวัน'},
  {key:'3', value:'ต่อชิ้นงาน'},
]
return (
  <ScrollView style={{}}>

<View style={{ padding: 20 }}>
        <Text>หัวข้องาน</Text>
        <TextInput
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholder="หัวข้องาน"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
    <Text>ตำแหน่งที่รับ</Text>
<TextInput
          value={position}
          onChangeText={setPosition}
          placeholder="ตำแหน่ง/อาชีพ"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
    <Text>บริษัท</Text>
<TextInput
          value={agency}
          onChangeText={setAgency}
          placeholder="บริษัท"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />

        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
        <Button title="Pick Image" onPress={pickImage} />
        <Text>ประเภทงาน</Text>
        <SelectList 
        setSelected={(val) => setCategory(val)} 
        data={categorydata} 
        placeholder='ประเภทของงาน'
        save="value"
      />

    <Text>ประเภทการจ้าง</Text>
        <SelectList 
        setSelected={(val) => setEmploymentType(val)} 
        data={emptypedata} 
        placeholder='ประเภทการจ้าง'
        save="value"
      />

<Text>ค่าจ้าง</Text>
<TextInput
          value={wage}
          onChangeText={setWage}
          placeholder="฿บาท"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
    
        <Button title="Submit Post" onPress={submitPost} />
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