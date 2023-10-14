import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";


const CreateFind = ({ route, navigation }) => {
 
    return (
        <View style={styles.screen}>
        <Text>Create Find</Text>
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

export default CreateFind;
