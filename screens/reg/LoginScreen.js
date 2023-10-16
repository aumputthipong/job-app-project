import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const LoginScreen = ({route, navigation}) => {
  
//   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
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
      <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
        <Text style={styles.text}>รหัสผ่าน</Text>
      </View>

      <TextInput
        style={styles.input}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        // จำนวนตัวอักษรมากสุด
        maxLength={20}
        placeholder="รหัสผ่าน"
        //...เพิ่ม property value และ onChangeText...
        // value={enteredValue}
        // onChangeText={numberInputHandler}
      />
     <TouchableOpacity style={styles.button}
      onPress={() => {
        navigation.navigate("BottomTabNav");
      }}>
        <Text style={{...styles.text,...{alignSelf:"center",}}}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>
      <View style={{ ...styles.postRow,...{ alignSelf: "left", width: "80%" ,justifyContent:"center"} }}>
        <Text style={{...styles.text,...{fontSize:18,color:"blue",marginLeft:20}}}>ยังไม่มีบัญชีใช่ไหม</Text>
        <TouchableOpacity  onPress={() => {
        navigation.navigate("Register");
      }}>
        <Text style={{...styles.text,...{fontSize:18,marginLeft:10,textDecorationLine:"underline"}}}>สมัครที่นี่</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
