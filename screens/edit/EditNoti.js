import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../database/firebaseDB";
import { SelectList } from "react-native-dropdown-select-list";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { filterJobs } from "../../store/actions/jobAction";
import { useDispatch } from "react-redux";


  const EditNoti = ({ navigation }) => {
    const dispatch = useDispatch();
    const [jobType, setJobType] = useState(""); // ประเภทงาน
    const [hireType, setHireType] = useState(""); // ประเภทการจ้าง
    const [wages, setWages] = useState(""); // ค่าจ้าง
  
    const applyFilters = () => {
      // ส่งค่า filter ไปยัง Redux state
      dispatch(filterJobs(jobType, hireType, wages));
      navigation.goBack(); // กลับไปหน้า NotificationScreen
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="ประเภทงาน"
          value={jobType}
          onChangeText={(text) => setJobType(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="ประเภทการจ้าง"
          value={hireType}
          onChangeText={(text) => setHireType(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="ค่าจ้าง"
          value={wages}
          onChangeText={(text) => setWages(text)}
        />
        <Button title="กรอง" onPress={applyFilters} />
      </View>
    );
  };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: "85%",
    paddingHorizontal: 10,
    height: 40,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign: "left",
    marginLeft: 15,
    backgroundColor: "white",
  },
  text: {
    textAlign: "left",
    fontSize: 15,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#BEBDFF",
    color: "red",
    width: "50%",
    height: "5%",
    borderRadius: 10,
    paddingTop: "1.5%",
  },
  postRow: {
    flexDirection: "row",
    // backgroundColor:"red",
  },
  postImage: {
    width: 250,
    height: 180,
    justifyContent: "flex-end",
    resizeMode: "stretch",
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

export default EditNoti;
