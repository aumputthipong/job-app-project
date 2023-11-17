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
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../database/firebaseDB";
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EditFind = ({ route, navigation }) => {
  const postId = route.params.id;
  const availableJob = useSelector((state) => state.jobs.filteredJobs);
  const displayedJob = availableJob.find(job => job.id == postId);
console.log(imageUrl)
  const [jobTitle, setJobTitle] = useState("");
  const [position, setPosition] = useState("");
  const [agency, setAgency] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [phone, setPhone] = useState("");
  const [wage, setWage] = useState("");
  const [welfareBenefits, setWelfareBenefits] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);


  useEffect(() => {
    if (displayedJob) {
      setJobTitle(displayedJob.jobTitle);
      setPosition(displayedJob.position);
      setAgency(displayedJob.agency);
      setAttributes(displayedJob.attributes);
      setCategory(displayedJob.category);
      setDetail(displayedJob.detail);
      setEmail(displayedJob.email);
      setEmploymentType(displayedJob.employmentType);
      setPhone(displayedJob.phone);
      setWage(displayedJob.wage);
      setWelfareBenefits(displayedJob.welfareBenefits);
      setImageUrl(displayedJob.imageUrl)
      
    }
  }, [displayedJob]);
 
  const submitPost = async () => {
  // สร้างอ็อบเจกต์ที่เก็บข้อมูลที่คุณต้องการแก้ไข
  const updatedData = {
    jobTitle,
    position,
    agency,
    attributes,
    welfareBenefits,
    wage,
    category,
    employmentType,
    email,
    detail,
    phone,
    // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการแก้ไข
  };

  try {
    // อัปเดตข้อมูลใน Firestore โดยใช้ `docId` ของโพสต์ที่คุณต้องการแก้ไข
    const postRef = firebase.firestore().collection("JobPosts").doc(postId);
    await postRef.update(updatedData);

    console.log("Post updated successfully");
    navigation.navigate("FindJobDetailScreen",{id:postId});
  } catch (e) {
    console.error("Error updating data: ", e);
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
  const deletePost = async () => {
    try {
      // Delete the post document from Firestore
      await firebase.firestore().collection("JobPosts").doc(postId).delete();
  
      // If there is an image associated with the post, delete it from storage
      if (imageUrl) {
        const imageRef = firebase.storage().refFromURL(imageUrl);
        await imageRef.delete();
      }
  
      console.log("Post deleted");
      navigation.navigate("FindJobScreen");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
          placeholder="รายละเอียดงานที่ต้องการแก้ไข"
          multiline={true}
          numberOfLines={8}
          maxLength={500}
          style={{  textAlignVertical: 'top',  textAlign: 'left', flex: 1, borderWidth: 1,padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5, height: 180}}
        />

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
        <Text>อีเมล</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="อีเมล"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
        />
        <Text>เบอร์โทร</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="เบอร์โทร"
          maxLength={10}
          keyboardType="numeric"
          style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderWidth: 2, borderRadius: 5 }}
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
            style={{...styles.button,...{width:"20%" , marginLeft: 15}}}
            onPress={benefitAdd}
          >
            <Text style={{ ...{ color: "white" } }}>เพิ่ม</Text>
          </TouchableOpacity>   
        </View>
        
        <TouchableOpacity
          style={{ ...styles.button, ...{ width: "80%", marginVertical: 10} }}
          onPress={submitPost}
        >
          <Text style={{ ...{ color: "white" } }}>แก้ไข</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{ ...styles.button, ...{ width: "80%", backgroundColor: 'red'} }}
          onPress={deletePost}
        >
          <Text style={{ color: "white" }}>ลบโพสต์</Text>
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

  },
});

export default EditFind;
