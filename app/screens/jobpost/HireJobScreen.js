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
import { Ionicons } from '@expo/vector-icons'; 

const HireJobScreen = ({ route, navigation }) => {
  // const displayedHires = useSelector((state) => state.hires.filteredHires);
  const displayedUsers = useSelector((state) => state.users.users);
  const [searchText, setSearchText] = useState("");
  const displayedHires = useSelector((state) => {
    
    const { filteredHires } = state.hires;
    if (!searchText) {
      return filteredHires; // ไม่มีข้อความค้นหา, แสดงทั้งหมด
    }
    const lowerSearchText = searchText.toLowerCase();
    return filteredHires.filter((job) =>
      job.hireTitle.toLowerCase().includes(lowerSearchText)
    );
  });
  // const [hires, setHires] = useState(displayedHires);
  // const [users, setUsers] = useState(displayedUsers);

  // useEffect(() => {
  //   setHires(displayedHires);
  // }, [displayedHires]);

  // useEffect(() => {
  //   setUsers(displayedUsers);
  // }, [displayedUsers]);


  const renderHireItem = ({ item}) => {
    const user = displayedUsers.find((user) => user.id === item.postById);
    return(

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HireJobDetailScreen", { id: item.id });
        }}
      >
        <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
          <View style={styles.postRow}>
            <Image
              source={{ uri: user.imageUrl || "https://firebasestorage.googleapis.com/v0/b/log-in-d8f2c.appspot.com/o/profiles%2FprofilePlaceHolder.jpg?alt=media&token=35a4911f-5c6e-4604-8031-f38cc31343a1&_gl=1*51075c*_ga*ODI1Nzg1MDQ3LjE2NjI5N6JhaZ1Yx5r1r15r1h&_ga_CW55HF8NVT*MTY5ODA2NzU0NC4yNy4xLjE2OTgwNjgyMjEuMTcuMC4w"}}
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
            style={{...styles.detailText,...{ alignSelf: "flex-start", bottom: 0, position: 'absolute' },}}
          >
      
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
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <TouchableOpacity
        style={styles.createbutton}
        onPress={() => {
          navigation.navigate("CreateHire", {});
        }}
      >
       <Ionicons name="md-add" size={30} color="white" />
      </TouchableOpacity>

      <FlatList
        data={displayedHires}
        renderItem={renderHireItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBDFF",
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
    marginLeft: 16,
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
    fontSize: 14,
    color: "#424242",
    marginBottom: 10,
    marginLeft: 10,
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
  createbutton: {
    position:"absolute",
    bottom: 20, 
    right: 20,
    backgroundColor: "#5A6BF5",
    width: 60,
    height: 60,
    borderRadius:30,
    padding: "2.5%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
export default HireJobScreen;
