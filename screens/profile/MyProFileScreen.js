import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from '../../database/firebaseDB';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MyProfileScreen = ({ route, navigation }) => {
  //   const {step, title} = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editJob, setEditJob] = useState('');
  const [editAboutMe, setEditAboutMe] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLine, setEditLine] = useState('');
  const [editFacebook, setEditFacebook] = useState('');
  const [editBachelor, setEditBachelor] = useState('');
  const [editMaster, setEditMaster] = useState('');
  const [editDoctoral, setEditDoctoral] = useState('');

  const userId = firebase.auth().currentUser.uid; // รับ UID ของผู้ใช้ที่เข้าสู่ระบบ
  const startEditing = () => {
    setIsEditing(true);

    // กำหนดข้อมูลใน popup เป็นค่าปัจจุบัน
    setEditFirstName(userData.firstName);
    setEditLastName(userData.lastName);
    setEditJob(userData.job);
    setEditAboutMe(userData.aboutme);
    setEditEmail(userData.email);
    setEditPhone(userData.phone);
    setEditLine(userData.line);
    setEditFacebook(userData.facebook);
    setEditBachelor(userData.bachelor);
    setEditMaster(userData.master);
    setEditDoctoral(userData.doctoral);
    // กำหนดข้อมูลอื่น ๆ ที่คุณต้องการแก้ไข
    // ...
  };
  const finishEditing = () => {
    setIsEditing(false);
    const updatedData = {
      firstName: editFirstName,
      lastName: editLastName,
      job: editJob,
      aboutme: editAboutMe,
      email: editEmail,
      phone: editPhone,
      line: editLine,
      facebook: editFacebook,
      bachelor: editBachelor,
      master: editMaster,
      doctoral: editDoctoral,
      // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการอัพเดท
      // ...
    };

    firebase.firestore().collection('User Info').doc(userId).update(updatedData)
      .then(() => {
        console.log('อัพเดทข้อมูลสำเร็จ');
        // ไม่ต้องเรียก finishEditing() อีกที่นี่
        getUserData();
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการอัพเดทข้อมูล:', error);
      });
  };
  const getUserData = () => {
    const userRef = firebase.firestore().collection("User Info").doc(userId);

    userRef.get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log("ไม่พบข้อมูลผู้ใช้");
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error);
      });
  };
  useEffect(() => {
    getUserData(); // เรียกใน useEffect แรก
  }, []);
  

  return (
    <View style={styles.screen}>
      {userData ? ( 
        <View >
          {/*1st profileBox */}
          <View style={{ ...styles.profileBox, ...{ backgroundColor: "white" } }}>
            <View style={{ ...styles.postRow, ...styles.postHeader, ...{} }}>
              <View style={styles.postRow}>
                <Image
                  source={require("../../assets/PostPlaceholder.png")}
                  style={styles.profileImg}
                ></Image>
              </View>
              <View>
                {/* ชื่อ*/}
                <Text style={styles.HeaderText}>{userData.firstName} {userData.lastName}</Text>
                {/* อาชีพ */}
                <Text style={styles.subText}>{userData.job}</Text>
              </View>
              <Button title="แก้ไข" onPress={startEditing} />
            </View>
            {/* aboutme */}
            <Text style={{ ...styles.subTitle, ...{} }}>About Me</Text>

            <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
              {userData.aboutme}
            </Text>
          </View>
          {/*2 ContactBox */}
          <View style={{ ...styles.contactBox, ...{ backgroundColor: "white" } }}>
            {/* ช่องทางติดต่อ*/}
            <Text style={styles.HeaderText}>ช่องทางติดต่อ</Text>
            {/* email */}
            <View style={{ ...styles.postRow, ...{} }}>
              <Text style={styles.subTitle}>Email:</Text>
              <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
              {userData.email}
              </Text>
            </View>
            {/* เบอร์ */}
            <View style={styles.postRow}>
              <Text style={styles.subTitle}>เบอร์:</Text>
              <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
                {userData.phone}
              </Text>
            </View>
            {/* line */}
            <View style={styles.postRow}>
              <Text style={styles.subTitle}>line</Text>
              <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
                {userData.line}
              </Text>
            </View>
            {/* facebook */}
            <View style={styles.postRow}>
              <Text style={styles.subTitle}>facebook</Text>
              <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
                {userData.facebook}
              </Text>
            </View>
          </View>
          {/*3 EducationBox */}
          <View style={{ ...styles.contactBox, ...{ backgroundColor: "white" } }}>
            
            <Text style={styles.HeaderText}>การศึกษา</Text>
            
            <View style={{ ...styles.postRow, ...{} }}>
              <Text style={styles.subTitle}>ปริญญาตรี :</Text>
              <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal", width: "75%" } }}>
                {userData.bachelor}
              </Text>
            </View>
            {/* เบอร์ */}
            <View style={styles.postRow}>
              <Text style={styles.subTitle}>ปริญญาโท :</Text>
              <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal", marginRight: 10 } }}>
                {userData.master}
              </Text>
            </View>
            <View style={styles.postRow}>
              <Text style={styles.subTitle}>ปริญญาเอก :</Text>
              <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal", marginRight: 10 } }}>
                {userData.doctoral}
              </Text>
            </View>
          </View>
        </View>
      ): (
        <Text>กำลังโหลดข้อมูล...</Text>
      )}
      
      {isEditing && (
      <Modal animationType="slide" transparent={true} visible={isEditing}>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text>Edit Profile</Text>
          <TextInput
            placeholder="First Name"
            value={editFirstName}
            onChangeText={text => setEditFirstName(text)}
          />
          <TextInput
            placeholder="Last Name"
            value={editLastName}
            onChangeText={text => setEditLastName(text)}
          />
          <TextInput
            placeholder="Job"
            value={editJob}
            onChangeText={text => setEditJob(text)}
          />
          <TextInput
            placeholder="About Me"
            value={editAboutMe}
            onChangeText={text => setEditAboutMe(text)}
          />
          <TextInput
            placeholder="Email"
            value={editEmail}
            onChangeText={text => setEditEmail(text)}
          />
          <TextInput
            placeholder="Phone"
            value={editPhone}
            onChangeText={text => setEditPhone(text)}
          />
          <TextInput
            placeholder="Line"
            value={editLine}
            onChangeText={text => setEditLine(text)}
          />
          <TextInput
            placeholder="Facebook"
            value={editFacebook}
            onChangeText={text => setEditFacebook(text)}
          />
          <TextInput
            placeholder="Bachelor"
            value={editBachelor}
            onChangeText={text => setEditBachelor(text)}
          />
          <TextInput
            placeholder="Master"
            value={editMaster}
            onChangeText={text => setEditMaster(text)}
          />
          <TextInput
            placeholder="Doctoral"
            value={editDoctoral}
            onChangeText={text => setEditDoctoral(text)}
          />
          <Button title="Save" onPress={finishEditing} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ABA7FA",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ABA7FA",
  },
  profileBox: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: "40%",
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",

    // padding: 20
  },
  contactBox: {
    backgroundColor: "#f9c2ff",
    width: "90%",
    height: "30%",
    marginVertical: "1%",
    borderRadius: 10,
    alignSelf: "center",
  },
  HeaderText: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
    // backgroundColor:"red"
  },
  subText: {
    fontSize: 18,
    marginHorizontal: 20,
    // backgroundColor:"blue"
  },
  detailText: {
    fontSize: 11,
    color: "#929090",
    marginHorizontal: 10,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
  postRow: {
    flexDirection: "row",
    // backgroundColor:"red",
  },
  postHeader: {
    height: "30%",
  },
  input: {
    width: 200,
    textAlign: "center",
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign: "left",
    marginLeft: 15,
  },
  profileImg: {
    marginTop: 10,
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 360,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // สีสแครมหลังหน้า
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'red',
  },
});

export default MyProfileScreen;