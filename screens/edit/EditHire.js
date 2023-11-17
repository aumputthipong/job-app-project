import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { updateHireData } from "../../store/actions/hireAction";

// ก่อนพัง
const EditHire = ({ route, navigation }) => {
  const hireid = route.params.id;
  const availableHire = useSelector((state) => state.hires.filteredHires);
  const displayedHire = availableHire.find((hire) => hire.id == hireid);

  const displayedUsers = useSelector((state) => state.users.users);

  const [hireTitle, setHireTitle] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [postData, setPostData] = useState(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (displayedHire) {
      setHireTitle(displayedHire.hireTitle);
      setCategory(displayedHire.category);
      setDetail(displayedHire.detail);
      setEmail(displayedHire.email);
      setPhone(displayedHire.phone);
    }
  }, [displayedHire]);
  // console.log(displayedHire)
  const submitPost = async () => {
    // สร้างอ็อบเจกต์ที่เก็บข้อมูลที่คุณต้องการแก้ไข
    const updatedData = {
      hireTitle,
      detail,
      email,
      phone,
      category,
      // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการแก้ไข
    };

    try {
      // อัปเดตข้อมูลใน Firestore โดยใช้ `hireid` ของโพสต์ที่คุณต้องการแก้ไข
      const postRef = firebase.firestore().collection("HirePosts").doc(hireid);
      await postRef.update(updatedData);

      console.log("Post updated successfully");
      navigation.navigate("HireJobDetailScreen", { id: hireid });
    } catch (e) {
      console.error("Error updating data: ", e);
    }
  };
  const deletePost = async () => {
    try {
      // Delete the post document from Firestore
      await firebase.firestore().collection("HirePosts").doc(hireid).delete();

      // If there is an image associated with the post, delete it from storage
      if (imageUrl) {
        const imageRef = firebase.storage().refFromURL(imageUrl);
        await imageRef.delete();
      }

      console.log("Post deleted");
      navigation.navigate("HireJobScreen");
    } catch (error) {
      console.error("Error deleting post:", error);
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
    { key: "9", value: "งานอาหาร" },
    { key: "10", value: "งานธรรมชาติ" },
    { key: "12", value: "งานทั่วไป" },
    { key: "12", value: "อื่นๆ" },
  ];
  // สร้างฟังก์ชันที่จะใช้ในการอัปเดตค่า category
  const handleCategoryChange = (selectedValue) => {
    setCategory(selectedValue);
  };
  return (
    <ScrollView style={{}}>
      <View style={{ padding: 20 }}>
        <Text>หัวข้อโพส</Text>
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
          placeholder="รายละเอียดที่ต้องการแก้ไข"
          style={{
            textAlignVertical: "top",
            textAlign: "left",
            flex: 1,
            borderWidth: 1,
            padding: 10,
            marginVertical: 10,
            borderWidth: 2,
            borderRadius: 5,
            height: 180,
          }}
        />

        <Text>ประเภทงาน</Text>
        <SelectList
          setSelected={(val) => {
            const index = val; // เลือก index ที่คุณต้องการ (เช่น 5)
            if (index >= 0 && index < categorydata.length) {
              setCategory(categorydata[index].value);
            }
          }}
          data={categorydata}
          placeholder="ประเภทของงาน"
          selectedValue={category}
          onValueChange={handleCategoryChange}
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
          keyboardType="numeric"
          maxLength={10}
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <View style={styles.postRow}>

        <TouchableOpacity
          style={{ ...styles.button, ...{ width: "65%", marginleft: 5,marginRight:5 } }}
          onPress={submitPost}
          >
          <Text style={{ ...{ color: "white" } }}>แก้ไข</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.button,
            ...{ backgroundColor: "red", marginVertical: 10 ,width:"35%"},
          }}
          onPress={deletePost}
          >
          <Text style={{ color: "white" }}>ลบโพสต์</Text>
        </TouchableOpacity>
          </View>
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

export default EditHire;
