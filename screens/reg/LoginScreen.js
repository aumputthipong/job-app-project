
import React, { useState }  from "react";
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity} from "react-native";
import firebase from '../../database/firebaseDB';
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ route, navigation }) => {
  //   const {step, title} = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); // คงให้ลงชื่อเข้าสู่ระบบ
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("BottomTabNav");
      // เข้าสู่ระบบสำเร็จ
    } catch (error) {
      // เข้าสู่ระบบไม่สำเร็จ
      console.log("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  }
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
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
        onChangeText={(text) => setEmail(text)}
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
        secureTextEntry={!showPassword}
        id="txtPassword"
        keyboardType="default"
        onChangeText={(text) => setPassword(text)}
        // จำนวนตัวอักษรมากสุด
        maxLength={20}
        placeholder="รหัสผ่าน"
        //...เพิ่ม property value และ onChangeText...
        // value={enteredValue}
        // onChangeText={numberInputHandler}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="black" />
      </TouchableOpacity>

     <TouchableOpacity style={styles.button}
      >
        <Button id="btnLog" title="เข้าสู่ระบบ" onPress={handleLogin} style={{...styles.text,...{alignSelf:"center",}}}></Button>
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
  iconButton: {
    position: 'relative',
    left: 150,
    top: -40,
  },
});

export default LoginScreen;
