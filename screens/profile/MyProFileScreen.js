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
import { Ionicons } from "@expo/vector-icons";

const MyProfileScreen = ({ route, navigation }) => {
  //   const {step, title} = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const initialEditData = {
    firstName: '',
    lastName: '',
    job: '',
    aboutme: '',
    email: '',
    phone: '',
    line: '',
    facebook: '',
    bachelor: '',
    master: '',
    doctoral: '',
  };

  const [editData, setEditData] = useState(initialEditData);

  const userId = firebase.auth().currentUser.uid;

  const startEditing = () => {
    setIsEditing(true);
    setEditData(userData || initialEditData);
  };

  const finishEditing = () => {
    setIsEditing(false);
    const updatedData = { ...editData };

    for (const key in updatedData) {
      if (!updatedData[key]) {
        updatedData[key] = "";
      }
    }

    firebase.firestore().collection('User Info').doc(userId).update(updatedData)
      .then(() => {
        console.log('อัพเดทข้อมูลสำเร็จ');
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
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("Login");
      // ออกจากระบบสำเร็จ
    } catch (error) {
      // ออกจากระบบไม่สำเร็จ
      console.error(error);
    }
  };

  

  return (
    <View style={styles.screen}>
      {userData ? (
         <View>
         {/*1st profileBox */}
         <View style={{ ...styles.profileBox, ...{ backgroundColor: "white" } }}>
           <View style={{ ...styles.postRow, ...styles.postHeader, ...{} }}>
             <View style={styles.postRow}>
             <Image source={require("../../assets/PostPlaceholder.png")} style={styles.profileImg}></Image>
          
             </View>
             <View>
               {/* ชื่อ*/}
               <Text style={styles.HeaderText}>{userData.firstName} {userData.lastName}</Text>
               {/* อาชีพ */}
               <Text style={styles.subText}>{userData.job}</Text>
             </View>
             <FontAwesome5 name={'edit'} size={22} onPress={startEditing} style={{...{ paddingLeft: 70, paddingTop: 10} }}/>
             
           </View>
           {/* aboutme */}
           <Text style={{ ...styles.subTitle, ...{} }}>About Me</Text>
           <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
             {userData.aboutme}
           </Text>
           <Ionicons name={'log-out-outline'} size={30} onPress={handleLogout} style={{...{ left: 310, top: 90} }}/>
         </View>
         {/*2 ContactBox */}
         <View style={{ ...styles.contactBox, ...{ backgroundColor: "white" } }}>
           {/* ช่องทางติดต่อ*/}
           <Text style={styles.HeaderText}>ช่องทางติดต่อ</Text>
           {/* email */}
           <View style={{ ...styles.postRow, ...{} }}>
             <Text style={styles.subTitle}><FontAwesome5 name={'user'}  size={20} />  Email :</Text>
             <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
             {userData.email}
             </Text>
           </View>
           {/* เบอร์ */}
           <View style={styles.postRow}>
             <Text style={styles.subTitle}><FontAwesome5 name={'phone'}  size={20} /> Phone :</Text>
             <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
               {userData.phone}
             </Text>
           </View>
           {/* line */}
           <View style={styles.postRow}>
             <Text style={styles.subTitle}><FontAwesome5 name={'line'}  size={22} /> Line :</Text>
             <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
               {userData.line}
             </Text>
           </View>
           {/* facebook */}
           <View style={styles.postRow}>
             <Text style={styles.subTitle}><FontAwesome5 name={'facebook'}  size={20} /> Facebook :</Text>
             <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
               {userData.facebook}
             </Text>
           </View>
         </View>
         {/*3 EducationBox */}
         <View style={{ ...styles.contactBox, ...{ backgroundColor: "white", height: "25%", position: 'relative' } }}>
           
           <Text style={styles.HeaderText}>การศึกษา</Text>
           
           <View style={{ ...styles.postRow, ...{} }}>
             <Text style={styles.subTitle}>ปริญญาตรี :</Text>
             <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal", width: "75%" } }}>
               {userData.bachelor}
             </Text>
           </View>
           {/* เบอร์ */}
           <View style={styles.postRow}>
             <Text style={styles.subTitle}>ปริญญาโท : </Text>
             <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal", marginRight: 10 } }}>
               {userData.master}
             </Text>
           </View>
           <View style={styles.postRow}>
             <Text style={styles.subTitle}>ปริญญาเอก : </Text>
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
      <ScrollView>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
        <Text style={{ ...{ alignSelf: 'center'} }}>Edit Profile</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsEditing(false)}
          >
            <FontAwesome name={'remove'}  size={20} />
          </TouchableOpacity>
          <Text>ชื่อจริง</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="First Name"
            value={editData.firstName}
            onChangeText={(text) =>
              setEditData({ ...editData, firstName: text })
            }
          />
          <Text>นามสกุล</Text>
          <TextInput
            style={styles.txtinput}
            placeholder="Last Name"
            value={editData.lastName}
            onChangeText={(text) =>
              setEditData({ ...editData, lastName: text })
            }
          />
          <Text>อาชีพ</Text>
          <TextInput
          style={styles.txtinput}
            placeholder="Job"
            value={editData.job}
            onChangeText={(text) => setEditData({ ...editData, job: text })}
          />
          <Text>About Me</Text>
          <TextInput
          style={styles.txtinput}
            placeholder="About Me"
            value={editData.aboutme}
            onChangeText={(text) =>
              setEditData({ ...editData, aboutme: text })
            }
          />
          <Text>About Me</Text>
          <TextInput
          style={styles.txtinput}
            placeholder="Email"
            value={editData.email}
            onChangeText={(text) => setEditData({ ...editData, email: text })}
          />
          <Text>เบอร์โทร</Text>
          <TextInput
          style={styles.txtinput}
            placeholder="Phone"
            value={editData.phone}
            onChangeText={(text) => setEditData({ ...editData, phone: text })}
          />
          <Text>Line</Text>
          <TextInput
          style={styles.txtinput}
            placeholder="Line"
            value={editData.line}
            onChangeText={(text) => setEditData({ ...editData, line: text })}
          />
          <Text>Facebook</Text>
          <TextInput
          style={styles.txtinput}
            placeholder="Facebook"
            value={editData.facebook}
            onChangeText={(text) =>
              setEditData({ ...editData, facebook: text })
            }
          />
          <Text>การศึกษา</Text>
          <TextInput
          style={styles.txtinput}
            placeholder="Bachelor"
            value={editData.bachelor}
            onChangeText={(text) =>
              setEditData({ ...editData, bachelor: text })
            }
          ></TextInput>
          <TextInput
          style={styles.txtinput}
            placeholder="Master"
            value={editData.master}
            onChangeText={(text) =>
              setEditData({ ...editData, master: text })
            }
          />
          <TextInput
          style={styles.txtinput}
            placeholder="Doctoral"
            value={editData.doctoral}
            onChangeText={(text) =>
              setEditData({ ...editData, doctoral: text })
            }
          />
          <Text style={{...styles.saveButton,...{}}} title="Save" onPress={finishEditing}>Save</Text>
        </View>
      </View>
      </ScrollView>
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
  profileBox: {
    width: 350,
    height: 270,
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",
  },
  contactBox: {
    width: 350,
    height: "28.5%",
    marginVertical: "1%",
    borderRadius: 10,
    alignSelf: "center",
  },
  HeaderText: {
    marginTop: 10,
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
    height: 'auto',
  },
  txtinput: {
    width: "100%",
    paddingHorizontal: 10,
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    textAlign: "left",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    bottom: 25
  },
  saveButton: {
    backgroundColor: "#BEBDFF",
    width:"50%",
    height: 40,
    borderRadius:10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: "white",
    alignSelf: "center",
    fontSize : 18
  }
});

export default MyProfileScreen;