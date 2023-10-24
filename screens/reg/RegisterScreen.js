import React, { useState } from "react";


import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import firebase from '../../database/firebaseDB';
import { Ionicons } from "@expo/vector-icons";
  
const RegisterScreen = ({ route, navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async () => {
    try {
      if (password === confirmPassword) {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        // การลงทะเบียนสำเร็จ
        if (response.user) {
          // การลงทะเบียนสำเร็จ
          const user = {
            email,
            firstName,
            lastName,
          };
          await firebase.firestore().collection("User Info").doc(response.user.uid).set(user);
          navigation.navigate("Login");
        }
      } else {
        console.log("รหัสผ่านไม่ตรงกัน");
      }
    } catch (error) {
      // การลงทะเบียนไม่สำเร็จ
      alert(error)
      console.error(error);
    }
  }
  const [showPassword1, setShowPassword1] = useState(false);
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <View style={styles.screen}>


    

    {/* email */}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
      <Text style={{ ...styles.text, ...{} }}>อีเมล</Text>
    </View>
    <TextInput
      style={styles.input}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="email-address"
      onChangeText={(text) => setEmail(text)}
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="อีเมล"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />

       {/* =ชื่อ */}
       <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
      <Text style={{ ...styles.text, ...{} }}>ชื่อจริง</Text>
    </View>
    <TextInput
      style={styles.input}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(text) => setFirstName(text)}
      keyboardType="default"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="ชื่อจริง"

      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />
       {/* สกุล*/}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
      <Text style={{ ...styles.text, ...{} }}>นามสกุล</Text>
    </View>
    <TextInput
      style={styles.input}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(text) => setLastName(text)}
      keyboardType="default"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="นามสกุล"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />
    {/* รหัสผ่าน */}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
      <Text style={styles.text}>รหัสผ่าน</Text>
    </View>
    <TextInput
      style={styles.input}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={!showPassword1}
      keyboardType="default"
      onChangeText={(text) => setPassword(text)}
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="รหัสผ่าน"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />

     {/* ยืนยันรหัสผ่าน */}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
      <Text style={styles.text}>ยืนยันรหัสผ่าน</Text>
    </View>
    <TextInput
      style={styles.input}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={!showPassword2}
      onChangeText={(text) => setConfirmPassword(text)}
      keyboardType="default"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="ยืนยันรหัสผ่าน"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />


   <TouchableOpacity style={styles.button}
 onPress={handleRegistration}>
      <Text  style={{...styles.text,...{alignSelf:"center",}}}>ลงทะเบียน</Text>
    </TouchableOpacity>

    <View style={{ ...styles.postRow,...{ alignSelf: "left", width: "80%",justifyContent:"center" } }}>
      <Text style={{...styles.text,...{fontSize:18,color:"blue",marginLeft:20}}}>มีบัญชีแล้ว</Text>
      <TouchableOpacity  onPress={() => {
      navigation.navigate("Login");
    }}>
      <Text style={{...styles.text,...{fontSize:18,marginLeft:10,textDecorationLine:"underline"}}}>เข้าสู่ระบบที่นี่</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={togglePasswordVisibility1} style={styles.iconButton}>
      <Ionicons name={showPassword1 ? 'eye' : 'eye-off'} size={20} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={togglePasswordVisibility2}  style={{ ...styles.iconButton, top: -145 }}>
      <Ionicons name={showPassword2 ? 'eye' : 'eye-off'} size={20} color="black" />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: "10%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems:"center"
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
    backgroundColor: "white",
  },
  text: {
    textAlign: "left",
    fontSize: 15,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#BEBDFF",
    width: "50%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  postRow: {
    flexDirection: "row",
  },
  iconButton: {
    position: 'relative',
    left: 145,
    top: -205,
  },
});

export default RegisterScreen;
