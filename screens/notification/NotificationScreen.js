import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const NotificationScreen = ({route, navigation}) => {
  
//   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
    <Text>NotificationScreen</Text>
    {/* <Button
      title="Go Back to Categories"
      onPress={() => {
        // เขียนโค้ดเพิ่ม
        navigation.navigate("Categories", {
          prev: "MealDetail",
        });
      }}
    /> */}
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

export default NotificationScreen;
