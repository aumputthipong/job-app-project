import React from "react";
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity,Image} from "react-native";

const WelcomeScreen = ({route, navigation}) => {
  
//   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
      <Image  style={styles.logo}source={require("../assets/welcomelogo.png")}></Image>
    <Text style={styles.title}>Job Search </Text>
    <Text  style={styles.title}> Application </Text>

    <View style={{ ...styles.postRow,...{ alignSelf: "left", width: "80%",justifyContent: "center"}}}>
      <Text style={{...styles.text,...{fontSize:18,color:"blue",marginLeft:20,marginTop:20}}}>มีบัญชีแล้ว</Text>
      <TouchableOpacity  onPress={() => {
      navigation.navigate("Login");
    }}>
      <Text style={{...styles.text,...{fontSize:18,marginLeft:10,marginTop:20,textDecorationLine: "underline"}}}>เข้าสู่ระบบที่นี่</Text>

      </TouchableOpacity>
    </View> 
    <View style={{ ...styles.postRow,...{ alignSelf: "left", width: "80%",justifyContent: "center"}}}>
      <Text style={{...styles.text,...{fontSize:18,color: "blue",marginLeft:20,marginTop:20}}}>ยังไม่มีบัญชีใช่ไหม</Text>
      <TouchableOpacity  onPress={() => {
      navigation.navigate("Register");
    }}>
      <Text style={{...styles.text,...{fontSize:18,marginLeft:10,marginTop:20,textDecorationLine:"underline"}}}>สมัครสมาชิกที่นี่</Text>


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
  title: {
    marginLeft: 15,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    color: "#083C6B",
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
  logo:{
    width:300,
    height:300,
    resizeMode:"stretch"
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

export default WelcomeScreen;
