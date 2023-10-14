import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const LoginScreen = ({route, navigation}) => {
  
//   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
    <Text>Screen</Text>
    <Button
      title="Login"
      onPress={() => {
        // เขียนโค้ดเพิ่ม
        navigation.navigate("BottomTabNav", {
          prev: "Welcome",
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

export default LoginScreen;
