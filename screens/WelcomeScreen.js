import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const WelcomeScreen = ({route, navigation}) => {
  
//   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
    <Text>Welcome Screen</Text>
    <Button
      title="Login"
      onPress={() => {
        // เขียนโค้ดเพิ่ม
        navigation.navigate("Login", {

        });
      }}
    />
     <Button
      title="Register"
      onPress={() => {
        // เขียนโค้ดเพิ่ม
        navigation.navigate("Register", {

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

export default WelcomeScreen;
