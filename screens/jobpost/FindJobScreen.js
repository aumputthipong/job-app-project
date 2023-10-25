import React, { useState, useEffect , useCallback} from "react";
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
  Alert,
} from "react-native";
import { useNavigation, useIsFocused ,useFocusEffect } from '@react-navigation/native';
import { useSelector,useDispatch } from "react-redux";
import {LINK_JOB} from "../../store/actions/jobAction"
import firebase from "../../database/firebaseDB";
import { Ionicons } from '@expo/vector-icons'; 




const FindJobScreen = ({ route, navigation }) => {

  const currentUserId = firebase.auth().currentUser.uid;
  const displayedJobs = useSelector((state) => state.jobs.filteredJobs);

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
    
        <Text style={{...styles.detailText,...{ alignSelf: "flex-start", marginTop: 45 },}}>
          29 ก.พ.64
        </Text>
      </View>
    </TouchableOpacity>
    
    
  );

  

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

      <TouchableOpacity style={styles.createbutton} onPress={() => {navigation.navigate("CreateFind", {});}}>
       <Ionicons name="md-add" size={30} color="white" />
      </TouchableOpacity>

      <FlatList
        data={displayedJobs}
        renderItem={({ item }) => {
          return renderJobItem({ itemData: item });
        }}
        keyExtractor={(item) => item.id.toString()} // Use toString() to ensure the key is a string
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
  postRow: {
    flexDirection: "row",
    backgroundColor: "gray",
    borderRadius: 20,
  },
  postHeader: {
    height: "50%",
    
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

export default FindJobScreen;
