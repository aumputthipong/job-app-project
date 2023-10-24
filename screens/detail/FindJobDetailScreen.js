import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FindJobDetailScreen = ({ route, navigation }) => {


  const jobid = route.params.id;
  const availableJob = useSelector((state) => state.jobs.filteredJobs);
  const displayedJob = availableJob.find(job => job.id == jobid);
  // console.log("display index :"+displayedJob[0])

  return (
    <View style={styles.screen}>

      <ScrollView style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
        <View style={{ ...styles.postRow, ...styles.postHeader }}>
          <ImageBackground
            source={{uri: displayedJob.imageUrl}}
            style={styles.bgImage}
          ></ImageBackground>
        </View>
    
         {/* ชื่อหน่วยงาน */}
         <Text style={styles.jobTitle} >
          {displayedJob.jobTitle}
        </Text>
        {/* ชื่อหน่วยงาน */}
        <Text style={styles.title} >
          {displayedJob.agency}
        </Text>
        {/* ตำแหน่ง */}
 
  
        <Text style={styles.subTitle}>ตำแหน่ง :</Text>
        <Text style={styles.subText}>{displayedJob.position}</Text>

        {/* ค่าจ้าง */}
      
        <Text style={styles.subTitle}>รายละเอียดงาน :</Text>
        <Text style={styles.subText}>
        {displayedJob.detail}
        </Text>
     {/* ต้องทำเป็นflatlist แสดงคุณสมบัติ */}
        {/* คุณสมบัติ */}

        <Text style={styles.subTitle}>คุณสมบัติ :</Text>

      {/* เงื่อนไข */}
      {displayedJob.attributes.map((attribute, index) => (
        <Text style={styles.subText} key={index}>-{attribute}</Text>
      ))}
       

        {/* ระยะงาน */}
  
        <Text style={styles.subTitle}>ระยะเวลางาน :</Text>
        <Text style={styles.subText}>{displayedJob.position}</Text>
        {/* ค่าจ้าง */}

        <Text style={styles.subTitle}>ค่าจ้าง :</Text>
        <Text style={styles.subText}>{displayedJob.wages} บาท/{displayedJob.employmentType}</Text>

        {/* สวัสดิการ */}
        <Text style={styles.subTitle}>สวัสดิการ</Text>
        {displayedJob.welfareBenefits.map((welfareBenefit, index) => (
        <Text style={styles.subText} key={index}>-{welfareBenefit}</Text>
      ))}
        {/* ช่องทางติดต่อ */}
        <Text style={styles.subTitle}>ช่องทางติดต่อ</Text>
        <Text style={styles.subText}><MaterialCommunityIcons name='email' size={20} color="black" /> Email: {displayedJob.email}</Text>
        <Text style={styles.subText}><MaterialCommunityIcons name='phone' size={20} color="black" /> เบอร์โทร: {displayedJob.phone}</Text>

{/* กล่องคอมเม้น */}
        <Text style={{ ...styles.subText, ...{ marginTop: 30 } }}>
          ความคิดเห็น 1 รายการ
        </Text>
        {/* ช่องพิมพ์คอมเม้น + รูปโปรไฟล์ */}
        <View style={{...styles.postRow,...{ marginVertical:10,}}}>
        <Image
            source={require("../../assets/PostPlaceholder.png")}
            style={{...styles.profileImg,...{}}}
          ></Image>
        <TextInput
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          placeholder="แสดงความคิดเห็น"
          //...เพิ่ม property value และ onChangeText...
          // value={enteredValue}
          // onChangeText={numberInputHandler}
        />
        </View>
{/* ต้องทำเป็นflatlist แสดงคอมเม้น */}
        {/* คอมเม้นทางบ้าน */}
        <View style={{...styles.postRow,...{ marginVertical:10,}}}>
          <Image
            source={require("../../assets/PostPlaceholder.png")}
            style={{...styles.profileImg,...{}}}
          ></Image>
          <View>
            <Text style={{ ...styles.subTitle, ...{ marginTop: 10 } }}>
              คุณจอร์น สิก จิก ซอน
            </Text>
            <Text style={{ ...styles.subText, ...{} }}>สุดยอดฮาฟฟู้ว</Text>
          </View>
        </View>
            {/* คอมเม้นทางบ้าน */}
        <View style={{...styles.postRow,...{}}}>
          <Image
            source={require("../../assets/PostPlaceholder.png")}
            style={{...styles.profileImg,...{}}}
          ></Image>
          <View>
            <Text style={{ ...styles.subTitle, ...{ marginTop: 10 } }}>
              คุณจอร์น สิก จิก ซอน
            </Text>
            <Text style={{ ...styles.subText, ...{ paddingBottom:75,} }}>สุดยอดฮาฟฟู้ว</Text>
          </View>
        </View>
    
    
      </ScrollView>
      <TouchableOpacity style={styles.editbutton} onPress={() => {navigation.navigate("EditFind", {
      id: displayedJob.id});}}>
          <Text  style={{...{color: "white"}}}>แก้ไข</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor:"#ABA7FA",
    
  },
  jobTitle:{
    marginTop: 20,
    marginLeft: 15,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },
  item: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: "100%",
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",
   
    
    // padding: 20
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
    // backgroundColor:"red",
  },
  postHeader: {
    height: 142,
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
  profileImg: {
    marginTop: 10,
    marginLeft:10,
    width: 45,
    height: 45,
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
});

export default FindJobDetailScreen;
