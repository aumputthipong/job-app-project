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
    <ScrollView>
      {userData ? (
         <View style={styles.screen}>
         {/*1st profileBox */}
         <View style={{ ...styles.profileBox, ...{ backgroundColor: "white" } }}>
         <Button title="ออกจากระบบ" onPress={handleLogout} />
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
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text>Edit Profile</Text>
          <TextInput
            placeholder="First Name"
            value={editData.firstName}
            onChangeText={(text) =>
              setEditData({ ...editData, firstName: text })
            }
          />
          <TextInput
            placeholder="Last Name"
            value={editData.lastName}
            onChangeText={(text) =>
              setEditData({ ...editData, lastName: text })
            }
          />
          <TextInput
            placeholder="Job"
            value={editData.job}
            onChangeText={(text) => setEditData({ ...editData, job: text })}
          />
          <TextInput
            placeholder="About Me"
            value={editData.aboutme}
            onChangeText={(text) =>
              setEditData({ ...editData, aboutme: text })
            }
          />
          <TextInput
            placeholder="Email"
            value={editData.email}
            onChangeText={(text) => setEditData({ ...editData, email: text })}
          />
          <TextInput
            placeholder="Phone"
            value={editData.phone}
            onChangeText={(text) => setEditData({ ...editData, phone: text })}
          />
          <TextInput
            placeholder="Line"
            value={editData.line}
            onChangeText={(text) => setEditData({ ...editData, line: text })}
          />
          <TextInput
            placeholder="Facebook"
            value={editData.facebook}
            onChangeText={(text) =>
              setEditData({ ...editData, facebook: text })
            }
          />
          <TextInput
            placeholder="Bachelor"
            value={editData.bachelor}
            onChangeText={(text) =>
              setEditData({ ...editData, bachelor: text })
            }
          />
          <TextInput
            placeholder="Master"
            value={editData.master}
            onChangeText={(text) =>
              setEditData({ ...editData, master: text })
            }
          />
          <TextInput
            placeholder="Doctoral"
            value={editData.doctoral}
            onChangeText={(text) =>
              setEditData({ ...editData, doctoral: text })
            }
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
    </ScrollView>
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
    width: "95%",
    height: "30%",
    marginVertical: "1%",
    borderRadius: 10,
    alignSelf: "center",

    // padding: 20
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