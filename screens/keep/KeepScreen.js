import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux"; 

const KeepScreen = ({ route, navigation }) => {

  const favoriteJobs = useSelector(state => state.jobs.favoriteJobs)
  const filteredJobs = useSelector(state => state.jobs.filteredJobs)
  const favJobs = filteredJobs.filter((job) => favoriteJobs.includes(job.id))
  // console.log(favJobs);
  const renderKeepItem = ({ itemData }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FindJobDetailScreen");
      }}
    >
      <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>

        {/* ชื่อหน่วยงาน */}
        <Text style={styles.title} numberOfLines={2}>
        {itemData.agency}
        </Text>
        {/* ตำแหน่ง */}
        <Text style={styles.subText}>{itemData.position}</Text>
        {/* ค่าจ้าง */}
        <Text style={styles.subText}>{itemData.wage}บาท/{itemData.employmentType}</Text>
        {/* เงื่อนไข */}

        {itemData.attributes.map((attribute, index) => (
        <Text style={styles.detailText} key={index}>-{attribute}</Text>
      ))}
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
    <View styles={{...styles.container,...{ }}}>
      <FlatList
        data={favJobs}
        renderItem={({ item }) => {
          return renderKeepItem({ itemData: item });
        }}
        keyExtractor={(item) => item.id.toString()} // Use toString() to ensure the key is a string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",

  },
  item: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: 200,
    marginVertical: "1%",
    paddingVertical: "5%",
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
    marginHorizontal: 10,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    resizeMode: "stretch",
  },
  postRow: {
    flexDirection: "row",
    backgroundColor: "gray",
  },
  postHeader: {
    height: "50%",
  },
});

export default KeepScreen;
