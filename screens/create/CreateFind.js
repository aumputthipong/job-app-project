import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebaseDB';
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
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // Save the download URL to Firestore or use it as needed
              console.log('File available at', downloadURL);
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
return (
  <ScrollView style={{}}>

<View style={{ padding: 20 }}>
        <Text>Job Title</Text>
        <TextInput
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholder="Enter job title"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />

        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
        <Button title="Pick Image" onPress={pickImage} />

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