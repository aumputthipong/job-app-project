import React,{useState} from "react";
import { View, Text, Modal, Button, StyleSheet,ScrollView ,Image,TouchableOpacity} from "react-native";
import { useSelector } from "react-redux";
import firebase from "../../database/firebaseDB";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const HireJobDetailScreen = ({route, navigation}) => {

const hireid = route.params.id;
  const availableHire = useSelector((state) => state.hires.filteredHires);
  const displayedHire = availableHire.find(hire => hire.id == hireid);

  const displayedUsers = useSelector((state) => state.users.users);
  const currentUserId = firebase.auth().currentUser.uid;
  const postOwner =  displayedUsers.find(user => user.id ==displayedHire.postById )
  
 
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.item}>
<View style={{...styles.postRow,...styles.postHeader}}>
      <Image
          source={{uri:postOwner.imageUrl}}
          style={{ ...styles.profileImg, ...{} }}
        ></Image>
        <View>
    <Text style={{...styles.title,...{color:"white"}}}>{postOwner.firstName} {postOwner.lastName}</Text>
    <Text style={styles.subTitle}>{postOwner.job}</Text>
        </View>

    </View>
    
    <Text style={{...styles.jobTitle,...{fontSize:25,color:"#421BDF"}}}>{displayedHire.hireTitle}</Text>
    <Text style={{...styles.subText,...{fontSize:17}}}>รายละเอียดงาน</Text>
    <Text style={{...styles.subText,...{fontSize:17}}}>{displayedHire.detail}</Text>

        {/* ช่องทางติดต่อ */}
        <Text style={styles.subTitle}>ช่องทางติดต่อ</Text>
        <Text style={styles.subText}><MaterialCommunityIcons name='email' size={20} color="black" /> Email: {displayedHire.email}</Text>
        <Text style={styles.subText}><MaterialCommunityIcons name='phone' size={20} color="black" /> เบอร์โทร: {displayedHire.phone}</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
    {
  currentUserId === displayedHire.postById && (
    <TouchableOpacity style={styles.editbutton} onPress={() => {navigation.navigate("EditHire", {
      id: displayedHire.id});}}>
          <Text  style={{...{color: "white"}}}><MaterialCommunityIcons name='comment-edit-outline' size={15} color="white" />แก้ไข</Text>
        </TouchableOpacity>
  )}
</View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    width: "95%",
    height: "100%",
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",
  borderRadius:20},
  profileImg: {
    marginTop: 10,
    marginLeft: 10,
    width: 75,
    height: 75,
    borderRadius: 360,
  },
  editbutton: {
    position:"absolute",
    bottom: 20, 
    right: 20,
    backgroundColor: "#5A6BF5",
    width: 75,
    height: 75,
    borderRadius:25,
    padding: "2.5%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },


  input: {
    width: 200,
    textAlign: "center",
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign:"left",
    marginLeft:15,
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
  jobTitle:{
    marginTop: 20,
    marginLeft: 15,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },
title: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: "#4B32E5",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
    // backgroundColor:"red"
  },
  resumeImg:{
    width:210,
    height: 297,
   marginLeft:"25%",
   shadowOpacity:10,
   shadowColor:"black",
  },
  subText: {
    fontSize: 18,
    marginHorizontal: 20,
    // backgroundColor:"blue"
    
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
    backgroundColor:"#545AEB",
  },
  postHeader: {
    borderTopEndRadius:20,
    borderTopStartRadius:20,
    height:120,
  },
  input: {
    width: 200,
    textAlign: "center",
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign:"left",
    marginLeft:15,
  },
});

export default HireJobDetailScreen;
