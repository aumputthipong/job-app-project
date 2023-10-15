import React from "react";
import { View, Text, Button, StyleSheet, TextInput ,TouchableOpacity} from "react-native";

const RegisterScreen = ({route, navigation}) => {
  
//   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
    <Text>RegisterScreen</Text>
    <Button
      title="Register"
      onPress={() => {
        // เขียนโค้ดเพิ่ม
        navigation.navigate("Login", {
          prev: "Login",
        });
      }}
    />
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

export default RegisterScreen;
