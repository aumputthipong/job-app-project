import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({route, navigation}) => {
  
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


    {/* username */}
    <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
      <Text style={{ ...styles.text, ...{} }}>ชื่อผู้ใช้</Text>
    </View>
    <TextInput
      style={styles.input}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}

      keyboardType="default"

      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="ชื่อผู้ใช้"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />

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
      keyboardType="default"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="ยืนยันรหัสผ่าน"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />

    <TouchableOpacity onPress={togglePasswordVisibility1} style={styles.iconButton}>
      <Ionicons name={showPassword1 ? 'eye' : 'eye-off'} size={20} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={togglePasswordVisibility2}  style={{ ...styles.iconButton, top: -142.5 }}>
      <Ionicons name={showPassword2 ? 'eye' : 'eye-off'} size={20} color="black" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}
    onPress={() => {
      navigation.navigate("Login");
    }}>
      <Text style={{...styles.text,...{alignSelf:"center",}}}>สมัครสมาชิก</Text>
    </TouchableOpacity>

    <View style={{ ...styles.postRow,...{ alignSelf: "left", width: "80%",justifyContent:"center" } }}>

      <Text style={{...styles.text,...{fontSize:18,color:"blue",marginLeft:20}}}>มีบัญชีแล้ว</Text>
      <TouchableOpacity  onPress={() => {
      navigation.navigate("Login");
    }}>
      <Text style={{...styles.text,...{fontSize:18,marginLeft:10,textDecorationLine:"underline"}}}>เข้าสู่ระบบที่นี่</Text>

      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop:"10%",
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
    marginBottom:10,  
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
  iconButton: {
    position: 'relative',
    left: 150,
    top: -40,
  },
});

export default RegisterScreen;
