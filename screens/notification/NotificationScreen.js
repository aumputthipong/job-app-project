import React, { useEffect, useState } from "react"; // ต้องเพิ่ม useState
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
import { filterJobs } from "../../store/actions/jobAction";
import { ViewBase } from "react-native";
import firebase from "../../database/firebaseDB";


const NotificationScreen = ({ route, navigation }) => {
  
  const notiData = useSelector((state) => state.jobs.notiData);
  const jobs = useSelector((state) => state.jobs.filterJob);
  

  // หา userId ของผู้ใช้ปัจจุบัน
  const currentUserId = firebase.auth().currentUser.uid;

  // กรอง User Noti ของผู้ใช้ปัจจุบัน
  const currentUserNoti = notiData.filter((noti) => noti.notiBy === currentUserId);


  // หา category ที่ผู้ใช้ต้องการดู


  // กรองโพสต์ที่มี category ตรงกับ categoriesToDisplay
  const filteredJobs = jobs.filter(job => currentUserNoti.some(noti => noti.category.includes(job.category) && noti.notiBy !== job.postById));


  const renderJobItem = ({ itemData }) => (
    <TouchableOpacity
    onPress={() => {
    navigation.navigate("FindJobDetailScreen", {
   id: itemData.id})
         }}
 >
   <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
     <View style={{ ...styles.postRow, ...styles.postHeader }}>
       <Image
         source={{
           uri: itemData.imageUrl}}
         style={styles.bgImage}
       ></Image>
       
     </View>
     {/* ชื่องาน */}
     <Text style={styles.title} numberOfLines={2}>
       {itemData.jobTitle}
     </Text>
     {/* ตำแหน่ง */}
     <Text style={styles.subText}>{itemData.position}</Text>
     {/* ค่าจ้าง */}
     <Text style={styles.subText}>{itemData.wage} บาท/{itemData.employmentType}</Text>
     {/* เงื่อนไข */}
     {itemData.attributes.map((attribute, index) => (
     <Text style={styles.detailText} key={index}>- {attribute}</Text>
     ))}
 
     <Text style={{...styles.detailText,...{ alignSelf: "flex-start", bottom: 10, position: 'absolute' },}}>
       29 ก.พ.64
     </Text>
   </View>
 </TouchableOpacity>
  );
  
  
  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("EditNoti", {}); }}>
        <Text style={{ ...{ color: "white" } }}>กรอง</Text>
      </TouchableOpacity>
      {/* <FlatList
          
          renderItem={({ item }) => {
            return renderJobItem({ itemData: item });
          }}
          keyExtractor={(item) => item.id.toString()}
        /> */}
      <FlatList
        data={filteredJobs}
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
    backgroundColor:"#ABA7FA",
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
    height: 390,
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",
    // padding: 20
  },
  title: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: "#4B32E5",
  },
  subText: {
    fontSize: 14,
    marginLeft: 25,
  },
  detailText: {
    fontSize: 12,
    color: "#929090",
    marginHorizontal: 10, 
  },
  postRow: {
    flexDirection: "row",
    backgroundColor: "gray",
    borderRadius: 20,
  },
  postHeader: {
    height: "50%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    resizeMode: "stretch",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  button: { 
    backgroundColor: "#5A6BF5",
    width:"50%",
    height: 40,
    borderRadius:10,
    padding:"2.5%",
    alignItems: "center",
    alignSelf:"center",
    marginTop: 10
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

export default NotificationScreen;
