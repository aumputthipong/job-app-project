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

  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LINK_JOB } from "../../store/actions/jobAction"
import { ViewBase } from "react-native";



const NotificationScreen = ({ route, navigation }) => {


  const displayedJobs = useSelector((state) => state.jobs.filteredJobs);

  const renderJobItem = ({ itemData }) => (
    <TouchableOpacity

       onPress={() => {
       navigation.navigate("FindJobDetailScreen", {
      id: itemData.id})
            }}
    >
      <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
        <View>
        </View>
        {/* ชื่อหน่วยงาน */}
        <Text style={styles.title} numberOfLines={2}>
          {itemData.agency}
        </Text>
        {/* ตำแหน่ง */}
        <Text style={styles.subText}>{itemData.position}</Text>
        {/* ค่าจ้าง */}
        <Text style={styles.subText}>{itemData.wages} บาท/{itemData.employmentType}</Text>
        {/* เงื่อนไข */}
        
    
        <Text style={{...styles.detailText,...{ alignSelf: "flex-start", marginTop: 15 },}}>
          29 ก.พ.64
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
 
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("EditNoti", {});}}>
        <Text  style={{...{color: "white"}}}>กรอง</Text>
      </TouchableOpacity>
        <FlatList
          data={displayedJobs}
          renderItem={({ item }) => {
            return renderJobItem({ itemData: item });
          }}
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
    height: 120,
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",
    // padding: 20
  },
  title: {
    marginTop: 10,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  
  postHeader: {
    height: "50%",
   
  },
  text: {
    color: "white",
  },
  button: { 
    backgroundColor: "#5A6BF5",
    width:"50%",
    height: 40,
    borderRadius:10,
    padding:"2.5%",
    alignItems: "center",
    alignSelf:"center",
  },
});

export default NotificationScreen;
