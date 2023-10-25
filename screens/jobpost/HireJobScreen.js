import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
const HireJobScreen = ({ route, navigation }) => {
  const displayedHires = useSelector((state) => state.hires.filteredHires);
  const displayedUsers = useSelector((state) => state.users.users);

  const [hires, setHires] = useState(displayedHires);
  const [users, setUsers] = useState(displayedUsers);

  useEffect(() => {
    setHires(displayedHires);
  }, [displayedHires]);

  useEffect(() => {
    setUsers(displayedUsers);
  }, [displayedUsers]);


  const renderHireItem = ({ item}) => {
    const user = users.find((user) => user.id === item.postById);
    return(

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HireJobDetailScreen", { id: item.id });
        }}
      >
        <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
          <View style={styles.postRow}>
            <Image
              source={{ uri: user.imageUrl }}
              style={{ ...styles.profileImg, ...{} }}
            ></Image>
            {/* ชื่อหน่วยงาน */}
            <View style={{ paddingTop: 10 }}>
              {user && (
                <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
              )}

              {/* ตำแหน่ง */}
              <Text style={styles.subText}>{user.job}</Text>
            </View>
          </View>

          <Text style={styles.title}>{item.hireTitle}</Text>
          {/* รายละเอียด */}
          <Text style={styles.detailText}>{item.detail}</Text>
          <Text
            style={{
              ...styles.detailText,
              ...{ alignSelf: "flex-start", marginTop: 15 },
            }}
          >
            29 ก.พ.64
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {

  }, []);
  return (
    <View style={styles.container}>
      {/* searchbar */}
      <TextInput
        style={styles.textInput}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        maxLength={20}
        placeholder="ค้นหา"
      //...เพิ่ม property value และ onChangeText...
      // value={enteredValue}
      // onChangeText={numberInputHandler}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("CreateHire", {});
        }}
      >
        <Text style={{ ...{ color: "white" } }}>สร้างโพสต์</Text>
      </TouchableOpacity>

      <FlatList
        data={hires}
        renderItem={renderHireItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ABA7FA",
  },
  textInput: {
    width: "90%",
    height: "5%",
    backgroundColor: "white",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: "left",
    paddingLeft: 15,
    marginLeft: 15,
    borderRadius: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: 225,
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: "#4B32E5",
  },
  subText: {
    fontSize: 13,
    marginLeft: 20,
  },

  detailText: {
    fontSize: 13,
    color: "#929090",
    margin: 10,
  },
  postRow: {
    flexDirection: "row",
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  postHeader: {
    height: "42.5%",
    width: "100%",

  },

  profileImg: {
    marginTop: 10,
    marginLeft: 10,
    width: 75,
    height: 75,
    borderRadius: 360,
  },
  button: {
    backgroundColor: "#5A6BF5",
    width: "50%",
    height: 40,
    borderRadius: 10,
    padding: "2.5%",
    alignItems: "center",
    alignSelf: "center",
  },
});
export default HireJobScreen;
