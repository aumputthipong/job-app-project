import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../database/firebaseDB";
import { SelectList } from "react-native-dropdown-select-list";

const CreateHire = ({ route, navigation }) => {
  const [hireTitle, setHireTitle] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [phone, setPhone] = useState("");


  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow access to your media library to pick an image."
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [210, 297], // สัดส่วนของ A4
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
      let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

      try {
        const response = await fetch(uploadUri);
        const blob = await response.blob();
        const uploadTask = firebase
          .storage()
          .ref()
          .child(`images/${filename}`)
          .put(blob);
        // abcdes
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle upload progress if needed
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            // Handle upload error
            console.error("Upload Error: ", error);
          },
          () => {
            // Upload completed successfully, get the download URL
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(async (downloadURL) => {
                // Save the download URL to Firestore or use it as needed
                const postById = firebase.auth().currentUser.uid;
                console.log("File available at", downloadURL);
                const post = {
                  hireTitle,
                  resumeUrl: downloadURL,
                  category,
                  detail,
                  postById,
                  phone,
                  email,
                  createdAt: new Date(), 
                  // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการใน post object
                };
                const postRef = firebase.firestore().collection("HirePosts");
                const docRef = await postRef.add(post);
                console.log("Post created with ID: ", docRef.id);
                navigation.navigate("HireJobScreen");
              });
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("No image to upload");
    }
  };

  const categorydata = [
    { key: "1", value: "งานบัญชี" },
    { key: "2", value: "งานทรัพยากรบุคคล" },
    { key: "3", value: "งานธนาคาร" },
    { key: "4", value: "งานสุขภาพ" },
    { key: "5", value: "งานก่อสร้าง" },
    { key: "6", value: "งานออกแบบ" },
    { key: "7", value: "งานไอที" },
    { key: "8", value: "งานการศึกษา" },
  ];
  return (
    <ScrollView style={{}}>
      <View style={{ padding: 20 }}>
        <Text>หัวโพส</Text>
        <TextInput
          value={hireTitle}
          onChangeText={setHireTitle}
          placeholder="หัวข้องาน"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />


        <Text>รายละเอียด</Text>
        <TextInput
          value={detail}
          onChangeText={setDetail}
          placeholder="เวลา"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <Text>รูปResume</Text>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ ...styles.postImage, ...{ alignSelf: "center" } }}
          />
        )}
        <TouchableOpacity
          style={{ ...styles.button, ...{ width: "80%", marginleft: "5" } }}
          onPress={pickImage}
        >
          <Text style={{ ...{ color: "white" } }}>เพิ่มรูปภาพโพสต์</Text>
        </TouchableOpacity>

        <Text>ประเภทงาน</Text>
        <SelectList
          setSelected={(val) => setCategory(val)}
          data={categorydata}
          placeholder="ประเภทของงาน"
          save="value"
        />



        <Text>ช่องทางติดต่อ</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="อีเมล"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="เบอร์โทร"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />


        

        <TouchableOpacity
          style={{ ...styles.button, ...{ width: "80%", marginleft: "5" } }}
          onPress={submitPost}
        >
          <Text style={{ ...{ color: "white" } }}>สร้างโพสต์</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: "10%",
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
    marginVertical: 10,
    backgroundColor: "#BEBDFF",
    color: "red",
    width: "50%",
    height: "5%",
    borderRadius: 10,
    paddingTop: "1.5%",
  },
  postRow: {
    flexDirection: "row",
    // backgroundColor:"red",
  },
  postImage: {
    width: 250,
    height: 180,
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
  button: {
    backgroundColor: "#5A6BF5",
    width: "50%",
    height: 40,
    borderRadius: 10,
    padding: "2.5%",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default CreateHire;
