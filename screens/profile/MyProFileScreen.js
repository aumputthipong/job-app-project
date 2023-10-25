import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebaseDB';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  const [image, setImage] = useState(null);
  const userId = firebase.auth().currentUser.uid;

  const pickImageAndUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your media library to pick an image.');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      submitImg(result.assets[0].uri);

      }
    }
  };

  const submitImg = async (uploadUri) => {
    if (uploadUri) {
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      try {
        const response = await fetch(uploadUri);
        const blob = await response.blob();
        const uploadTask = firebase.storage().ref().child(`profiles/${filename}`).put(blob);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Upload Error: ', error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
              const img = {
                imageUrl: downloadURL,
              };
              const userRef = firebase.firestore().collection('User Info').doc(userId);
              await userRef.update(img)
              .then(() => {
                console.log('อัพเดทข้อมูลสำเร็จ');
                getUserData();
              })
              .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการอัพเดทข้อมูล:', error);
              });
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
        <TouchableOpacity style={styles.createbutton} onPress={handleLogout}>
        <Text  style={{...{color: "white"}}}>Log Out</Text>
        </TouchableOpacity>
         {/*1st profileBox */}
         <View style={{ ...styles.profileBox, ...{ backgroundColor: "#E5F5FA" , height: "35%"} }}>
         <ScrollView>
           <View style={{ ...styles.postRow, ...styles.postHeader, ...{} }}>
             <View style={styles.postRow}>
             <Image source={{
              uri: userData.imageUrl || "https://firebasestorage.googleapis.com/v0/b/log-in-d8f2c.appspot.com/o/profiles%2FprofilePlaceHolder.jpg?alt=media&token=35a4911f-5c6e-4604-8031-f38cc31343a1&_gl=1*51075c*_ga*ODI1Nzg1MDQ3LjE2NjI5N6JhaZ1Yx5r1r15r1h&_ga_CW55HF8NVT*MTY5ODA2NzU0NC4yNy4xLjE2OTgwNjgyMjEuMTcuMC4w"}} style={styles.profileImg}></Image>
             
             </View>
             <View>
               {/* ชื่อ*/}
               <Text style={styles.HeaderText}>{userData.firstName} {userData.lastName}</Text>
               {/* อาชีพ */}
               <Text style={styles.subText}>{userData.job}</Text>
             </View>
             <FontAwesome5 name={'edit'} size={23} onPress={startEditing} style={{...{ left: 320, top: 10, position: 'absolute'} }}/>
             
           </View>
           {/* aboutme */}
           <Text style={{ ...{ color: '#3C3F40', left: 10, top: 90, fontWeight: 'bold', fontSize: 18 ,position: 'absolute'} }}>About Me</Text>
           <Text style={{ ...{ color: '#3C3F40', marginLeft: 20, fontSize:18, marginTop: 35} }}>
             {userData.aboutme}
           </Text>
           <FontAwesome5 name={'camera'} size={22} onPress={pickImageAndUpload} style={{...{ left: 70, top: 70, position: 'absolute'} }} />
           </ScrollView>
         </View>

         {/*2 ContactBox */}
         <View style={{ ...styles.contactBox, ...{ backgroundColor: "#E5F5FA"  } }}>
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
         <View style={{ ...styles.contactBox, ...{ backgroundColor: "#E5F5FA" ,  position: 'relative' } }}>
          <ScrollView>
           <Text style={{ ...styles.HeaderText, ...{marginBottom: 10 } }}>การศึกษา</Text>
           
           <View style={{ ...styles.postRow, ...{} }}>
             <Text style={styles.subTitle2}>ปริญญาตรี : 
             <Text style={{ ...styles.subTitle2, ...{ fontWeight: "normal", marginRight: 10 } }}>
             <Text> </Text>{userData.bachelor}
             </Text>
             </Text>
           </View>

           <View style={styles.postRow}>
             <Text style={styles.subTitle2}>ปริญญาโท : 
             <Text style={{ ...styles.subTitle2, ...{ fontWeight: "normal", marginRight: 10 } }}>
             <Text> </Text>{userData.master}
             </Text>
             </Text>
           </View>

           <View style={styles.postRow}>
             <Text style={styles.subTitle2}>ปริญญาเอก : 
             <Text style={{ ...styles.subTitle2, ...{ fontWeight: "normal", marginRight: 10 } }}>
             <Text> </Text>{userData.doctoral}
             </Text>
             </Text>
           </View>
           </ScrollView>
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
        <Text style={{ ...{ alignSelf: 'center', fontSize: 20 } }}>Edit Profile</Text>
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
          <Text>Email</Text>
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
  },
  contactBox: {
    width: 350,
    height: "29%",
    marginVertical: "1.5%",
    borderRadius: 10,
  },
  HeaderText: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: '#3C3F40'
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
    color: '#3C3F40'
  },
  subTitle2: {
    marginBottom: 10,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
    color: '#3C3F40'
  },
  subText: {
    fontSize: 18,
    marginHorizontal:15,
    // backgroundColor:"blue"
    color: '#3C3F40'
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
    borderColor: '#5666E9',
    borderWidth: 3
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
    backgroundColor: "#5A6BF5",
    width:"50%",
    height: 40,
    borderRadius:10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: "white",
    alignSelf: "center",
    fontSize : 18
  },
  createbutton: {
    position:"absolute",
    bottom: 0, 
    right: -15,
    backgroundColor: "#5A6BF5",
    width: 45,
    height: 45,
    borderRadius:10,
    padding: "2.5%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default MyProfileScreen;