import React from "react";
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity} from "react-native";

export const txtEmail = document.querySelector('#txtEmail')
export const txtPassword = document.querySelector('#txtPassword')
export const btnLog = document.querySelector('#btnLog')

const LoginScreen = ({ route, navigation }) => {
  //   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
      <View style={{ ...{ alignSelf: "left", width: "80%" } }}>
        <Text style={{ ...styles.text, ...{} }}>อีเมล</Text>
      </View>
      <TextInput
        style={styles.input}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        id="txtEmail"
        keyboardType="default"

        // จำนวนตัวอักษรมากสุด
        maxLength={20}
        placeholder="อีเมล"
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
        id="txtPassword"
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
        <Button id="btnLog" style={{...styles.text,...{alignSelf:"center",}}}>เข้าสู่ระบบ</Button>
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

export default LoginScreen;
