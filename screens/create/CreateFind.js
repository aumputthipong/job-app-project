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
  ScrollView
} from "react-native";
// import { ScrollView } from 'react-native-virtualized-view'
import * as ImagePicker from "expo-image-picker";
import firebase from "../../database/firebaseDB";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Now you can use Firebase services in your component

const CreateFind = ({ route, navigation }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [position, setPosition] = useState("");
  const [agency, setAgency] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [wage, setWage] = useState("");
  const [welfareBenefits, setWelfareBenefits] = useState([]);


  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "ต้องการสิทธิ์การเข้าถึง",
        "โปรดอนุญาติการเข้าถึงไฟล์รูปรูปภาพในเครื่องของคุณ."
      );
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
                  jobTitle,
                  position,
                  agency,
                  attributes,
                  welfareBenefits,
                  imageUrl: downloadURL,
                  wage,
                  category,
                  employmentType,
                  email,
                  phone,
                  postById,
                  createdAt: new Date(), 
                  // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการใน post object
                };
                const postRef = firebase.firestore().collection("JobPosts");
                const docRef = await postRef.add(post);
                console.log("Post created with ID: ", docRef.id);
                navigation.navigate("FindJobScreen");
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
  const emptypedata = [
    { key: "1", value: "รายเดือน" },
    { key: "2", value: "รายวัน" },
    { key: "3", value: "ต่อชิ้นงาน" },
  ];
  // สำหรับใส่attribute
  const [inputText, setInputText] = useState("");
  // welfareBenefit
  const [inputText2, setInputText2] = useState("");
  const attriAdd = () => {
    if (inputText.trim() !== "") {
      setAttributes([...attributes, inputText]);
      setInputText(""); // ล้าง TextInput
    }
  };
  const attriDel = (index) => {
    const newData = [...attributes];
    newData.splice(index, 1);
    setAttributes(newData);
  };

  const benefitAdd = () => {
    if (inputText2.trim() !== "") {
      setWelfareBenefits([...welfareBenefits, inputText2]);
      setInputText2(""); // ล้าง TextInput
    }
  };
  const BenefitDel = (index) => {
    const newData = [...welfareBenefits];
    newData.splice(index, 1);
    setWelfareBenefits(newData);
  };
  return (
    <ScrollView style={{}}>
      <View style={{ padding: 20 }}>
        <Text>หัวข้องาน</Text>
        <TextInput
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholder="หัวข้องาน"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
        />
        <Text>ตำแหน่งที่รับ</Text>
        <TextInput
          value={position}
          onChangeText={setPosition}
          placeholder="ตำแหน่ง/อาชีพ"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
        />
        <Text>บริษัท</Text>
        <TextInput
          value={agency}
          onChangeText={setAgency}
          placeholder="บริษัท"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
        />

        <Text>รายละเอียด</Text>
        <TextInput
          value={detail}
          onChangeText={setDetail}
          placeholder="รายละเอียดงาน"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
        />
        <Text>รูปโพส</Text>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ ...styles.postImage, ...{ alignSelf: "center" } }}
          />
        )}
        <TouchableOpacity
          style={{ ...styles.button, ...{ width: "80%", marginleft: "5", marginVertical: 10 } }}
          onPress={pickImage}
        >
          <Text style={{ ...{ color: "white" } }}>เพิ่มรูปภาพโพสต์</Text>
        </TouchableOpacity>

        <Text style={{marginBottom: 10 }}>ประเภทงาน</Text>
        <SelectList
          setSelected={(val) => setCategory(val)}
          data={categorydata}
          placeholder="ประเภทของงาน"
          save="value"
        />

        <Text style={{marginVertical: 10 }}>ประเภทการจ้าง</Text>
        <SelectList
          setSelected={(val) => setEmploymentType(val)}
          data={emptypedata}
          placeholder="ประเภทการจ้าง"
          save="value"
        />

        <Text style={{marginTop: 10 }}>ค่าจ้าง</Text>
        <TextInput
          value={wage}
          onChangeText={setWage}
          placeholder="บาท"
          keyboardType="numeric"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
        />
        <Text>ช่องทางติดต่อ</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="อีเมล"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="เบอร์โทร"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderWidth: 2, borderRadius: 5 }}
        />
        {/* attribute */}
        <Text>คุณสมบัติ</Text>
        {attributes.map((attribute, index) => (
           <View key={index}
           style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.subText} key={index}>{`${index + 1}. ${attribute}`}</Text>
        {/* ปุ่มลบ */}
        <TouchableOpacity style={{...{width:"20%" , alignSelf:'center'}}} onPress={() => attriDel(index)} >
          <FontAwesome name={'remove'}  size={20} />
        </TouchableOpacity>
        </View>
      ))}
       
      
      <View style={styles.postRow}>
      <TextInput
        placeholder="คุณสมบัติ"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        style={{ borderWidth: 2, padding: 10, marginVertical: 10 ,width:"75%", borderRadius: 5}}
      />
     
     <TouchableOpacity style={{...styles.button,...{width:"20%" , marginLeft: 15}}}  onPress={attriAdd} >
        <Text  style={{...{color: "white"}}}>เพิ่ม</Text>
      </TouchableOpacity>
      </View>

        {/* สวัสดิการ */}
        <Text>สวัสดิการ </Text>
        {welfareBenefits.map((welfareBenefit, index) => (
          <View key={index}
          style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.subText}>{`${index + 1}. ${welfareBenefit}`}</Text>
        <TouchableOpacity style={{...{width:"20%" , alignSelf:'center'}}} onPress={() => BenefitDel(index)} >
          <FontAwesome name={'remove'}  size={20} />
        </TouchableOpacity>
        </View>
      ))}
 
        <View style={styles.postRow}>
          <TextInput
            placeholder="สวัสดิการ"
            value={inputText2}
            onChangeText={(text) => setInputText2(text)}
            style={{ borderWidth: 2, padding: 10, marginVertical: 10 ,width:"75%", borderRadius: 5}}
          />

          <TouchableOpacity
            style={{ ...styles.button, ...{ width: "20%", marginLeft: 15 } }}
            onPress={benefitAdd}
          >
            <Text style={{ ...{ color: "white" } }}>เพิ่ม</Text>
          </TouchableOpacity>   
        </View>
        <TouchableOpacity
          style={{ ...styles.button, ...{ width: "80%", marginTop: 10 } }}
          onPress={submitPost}
        >
          <Text style={{ ...{ color: "white"} }}>สร้างโพสต์</Text>
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
  subText: {
    fontSize: 15,
  }
});

export default CreateFind;
