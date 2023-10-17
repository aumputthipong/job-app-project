import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,TextInput,
} from "react-native";
import { useSelector } from "react-redux"; 
const FindJobScreen = ({ route, navigation }) => {
    // const catId = route.params.id;
  
  const displayedJobs = useSelector(state => state.jobs.filteredJobs);

  console.log(displayedJobs)

    // const attributeItem = ({}) => 
  //      (<Text style={styles.detailText}>-มีประสบการณ์5ปีขึ้นไป</Text>);
  const Item = ({itemData}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FindJobDetailScreen");
      }}
    >
      <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
        <View style={{ ...styles.postRow, ...styles.postHeader }}>
          <ImageBackground
            source={require("../../assets/PostPlaceholder.png")}
            style={styles.bgImage}
          ></ImageBackground>
        </View>
        {/* ชื่อหน่วยงาน */}
        <Text style={styles.title} numberOfLines={2}>
           {/* {itemData.title} */}test
        </Text>
        {/* ตำแหน่ง */}
        <Text style={styles.subText}>Frontend Dev</Text>
        {/* ค่าจ้าง */}
        <Text style={styles.subText}>สามารถต่อรองเงินเดือนได้</Text>
        {/* เงื่อนไข */}

        <Text style={styles.detailText}>-มีประสบการณ์5ปีขึ้นไป</Text>
        <Text style={styles.detailText}>-มีประสบการณ์5ปีขึ้นไป</Text>
        <Text style={styles.detailText}>-มีประสบการณ์5ปีขึ้นไป</Text>
        <Text style={styles.detailText}>-มีประสบการณ์5ปีขึ้นไป</Text>
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
    <View styles={styles.container}>
         {/* searchbar */}
      <TextInput
          style={styles.textInput}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={20}
          placeholder="ค้นหา"
          //...เพิ่ม property value และ onChangeText...
          // value={enteredValue}
          // onChangeText={numberInputHandler}
        />
      <Button
        title="create"
        onPress={() => {
          navigation.navigate("CreateFind", {});
        }}
      />
      <FlatList
        data={displayedJobs}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
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
   textInput: {
    width: "90%",
    height: "5%",
    backgroundColor:"white",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "left",
    textAlign:"left",
    paddingLeft:15,
    marginLeft:15,
    borderRadius:20,

  },
  item: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: 335,
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

export default FindJobScreen;
