import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Image,
} from "react-native";

const HomeScreen = ({navigation}) => {
  const HomeBottoms = [
    {
      id: 1,
      name: "FindJob",
      image: require("../assets/FindJobIcon.png"),
    },
    {
      id: 2,
      name: "HireJob",
      image: require("../assets/HireJobIcon.png"),
    },
  ];

  return (
    <View style={styles.screen}>
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        navigation.navigate("FindJobScreen")
      }}
    >
      <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
        <ImageBackground
          source={require("../assets/FindJobIcon.png")}
          style={styles.bgImage}
        ></ImageBackground>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        Find Jobs
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        navigation.navigate("HireJobScreen")
      }}
    >
      <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
        <ImageBackground
          source={require("../assets/HireJobIcon.png")}
          style={styles.bgImage}
        ></ImageBackground>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        Hire Jobs
      </Text>
    </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop:60,
    backgroundColor:"#BEBDFF",
  },
  gridItem: {
    // flex: 1,
    width: "45%",
    marginTop: "15%",
    height: 175,
    alignSelf:"center"
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  bgImage: {
    width: "85%",
    height: "95%",
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
});

export default HomeScreen;
