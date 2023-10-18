import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";

const MyProfileScreen = ({ route, navigation }) => {
  //   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
      {/*1st profileBox */}
      <View style={{ ...styles.profileBox, ...{ backgroundColor: "white" } }}>
        <View style={{ ...styles.postRow, ...styles.postHeader, ...{} }}>
          <View style={styles.postRow}>
            <Image
              source={require("../../assets/PostPlaceholder.png")}
              style={styles.profileImg}
            ></Image>
          </View>
          <View>
            {/* ชื่อ*/}
            <Text style={styles.HeaderText}>คุณจอร์น ซิก จิกซอน</Text>
            {/* อาชีพ */}
            <Text style={styles.subText}>FullStack Developer at Microsoft</Text>
          </View>
        </View>
        {/* aboutme */}
        <Text style={{ ...styles.subTitle, ...{} }}>About Me</Text>

        <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
          ผมเป็นนักศึกษาจบใหม่ กำลังหางานทำครับ เป็นนักออกแบบเว็บไซต์ UX/UI
          และUV อยู่ย่านลาดบัง มีแมวเป็นของตัวเอง ขอบคุณครับ
        </Text>
      </View>
      {/*2 ContactBox */}
      <View style={{ ...styles.contactBox, ...{ backgroundColor: "white" } }}>
        {/* ช่องทางติดต่อ*/}
        <Text style={styles.HeaderText}>ช่องทางติดต่อ</Text>
        {/* email */}
        <View style={{ ...styles.postRow, ...{} }}>
          <Text style={styles.subTitle}>Email:</Text>
          <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
            640xxx@kmitl.ac.th
          </Text>
        </View>
        {/* เบอร์ */}
        <View style={styles.postRow}>
          <Text style={styles.subTitle}>เบอร์:</Text>
          <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
            096-xxxx-xxxx
          </Text>
        </View>
        {/* line */}
        <View style={styles.postRow}>
          <Text style={styles.subTitle}>line</Text>
          <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
            test123
          </Text>
        </View>
        {/* facebook */}
        <View style={styles.postRow}>
          <Text style={styles.subTitle}>facebook</Text>
          <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal" } }}>
            คุณจอร์นซิกจิกซอน
          </Text>
        </View>
      </View>
      {/*3 EducationBox */}
      <View style={{ ...styles.contactBox, ...{ backgroundColor: "white" } }}>
        {/* ช่องทางติดต่อ*/}
        <Text style={styles.HeaderText}>ช่องทางติดต่อ</Text>
        {/* email */}
        <View style={{ ...styles.postRow, ...{} }}>
          <Text style={styles.subTitle}>ปริญญาตรี :</Text>
          <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal",width:"75%" } }}>
          เทคโนโลยีสารสนเทศ แขนง Software Engineer
          </Text>
        </View>
        {/* เบอร์ */}
        <View style={styles.postRow}>
          <Text style={styles.subTitle}>ปริญญาโท : </Text>
          <Text style={{ ...styles.subTitle, ...{ fontWeight: "normal",marginRight:10 } }}>
          วิศกรรมปลูกผัก
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor:"#ABA7FA",
  },
  profileBox: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: "40%",
    marginVertical: "2%",
    borderRadius: 10,
    alignSelf: "center",

    // padding: 20
  },
  contactBox: {
    backgroundColor: "#f9c2ff",
    width: "95%",
    height: "30%",
    marginVertical: "1%",
    borderRadius: 10,
    alignSelf: "center",

    // padding: 20
  },
  HeaderText: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
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
    height: "30%",
  },
  input: {
    width: 200,
    textAlign: "center",
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign: "left",
    marginLeft: 15,
  },
  profileImg: {
    marginTop: 10,
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 360,
  },
});

export default MyProfileScreen;
