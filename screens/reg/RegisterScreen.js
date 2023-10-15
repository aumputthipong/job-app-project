import React from "react";
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity} from "react-native";

const RegisterScreen = ({route, navigation}) => {
  
//   const {step, title} = route.params;

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
      keyboardType="number-pad"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="ชื่อผู้ใช้"
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
      keyboardType="number-pad"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="ชื่อผู้ใช้"
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
      keyboardType="number-pad"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="ชื่อผู้ใช้"
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
      keyboardType="number-pad"
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
      keyboardType="number-pad"
      // จำนวนตัวอักษรมากสุด
      maxLength={20}
      placeholder="รหัสผ่าน"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
    />

   <TouchableOpacity style={styles.button}
    onPress={() => {
      navigation.navigate("Login");
    }}>
      <Text style={{...styles.text,...{alignSelf:"center",}}}>สมัครสมาชิก</Text>
    </TouchableOpacity>
    <View style={{ ...styles.postRow,...{ alignSelf: "left", width: "80%" } }}>
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
    marginVertical:10,  
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
});

export default RegisterScreen;
