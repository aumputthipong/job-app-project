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
  SafeAreaView,
  ScrollView,
} from "react-native";

const HireJobScreen = ({ route, navigation }) => {
  //   const {step, title} = route.params;
  const DATA = [
    {
      id: "1",
      Agency: "KMITL",
      position: "Frontend Dev",
    },
    {
      id: "2",
      Agency: "KMITL",
      position: "Frontend Dev",
    },
    {
      id: "3",
      Agency: "KMITL",
      position: "Frontend Dev",
    },
  ];
  const Item = ({ Agency }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("HireJobDetailScreen");
      }}
    >
      <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
        <View style={{ ...styles.mealRow,...styles.mealHeader }}>
        <Image
            source={require("../../assets/PostPlaceholder.png")}
            style={{...styles.profileImg,...{}}}
          ></Image>
        {/* ชื่อหน่วยงาน */}
        <Text style={styles.title}>KMITL</Text>
        {/* ตำแหน่ง */}
        <Text style={styles.subText}>Frontend Dev</Text>
        </View>
        {/* ค่าจ้าง */}
        {/* <Text style={styles.subText}>สามารถต่อรองเงินเดือนได้</Text> */}
        {/* รายละเอียด */}

  
        <Text style={styles.detailText}>รับออกแบบตึกใบหยก ตึกโหล ตึกโป๊ะ ตึกตึก !Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
 </Text>
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
  return (
    <View style={styles.container}>
      <Button
        title="create"
        onPress={() => {
          navigation.navigate("CreateHire", {});
        }}
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ABA7FA",
  },
  item: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: 175,
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",
    // padding: 20
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
    fontSize: 11,
    color: "#929090",
    marginLeft: 10,
  },

  mealRow: {
    flexDirection: "row",
    backgroundColor: "gray",
  },
  mealHeader: {
    height: 80,
    width:"100%",
  },
  profileImg: {
    marginTop: 10,
    marginLeft:10,
    width: 75,
    height: 75,
    borderRadius: 360,
  },
});
export default HireJobScreen;
