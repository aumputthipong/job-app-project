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
} from "react-native";

const FindJobDetailScreen = ({ route, navigation }) => {
  //   const {step, title} = route.params;

  return (
    <View style={styles.screen}>
      <ScrollView style={{ ...styles.item, ...{ backgroundColor: "white" } }}>
        <View style={{ ...styles.postRow, ...styles.postHeader }}>
          <ImageBackground
            source={require("../../assets/PostPlaceholder.png")}
            style={styles.bgImage}
          ></ImageBackground>
        </View>
        {/* ชื่อหน่วยงาน */}
        <Text style={styles.title} numberOfLines={2}>
          KMITL
        </Text>
        {/* ตำแหน่ง */}
 
      
        <Text style={styles.subTitle}>ตำแหน่ง</Text>
        <Text style={styles.subText}>Frontend Dev</Text>

        {/* ค่าจ้าง */}
      
        <Text style={styles.subTitle}>รายละเอียดงาน</Text>
        <Text style={styles.subText}>
          พัฒนาเว็บไซต์ของมหาลัยในส่วน Front end ใช้ภาษา HTML CSS JavaScript
          เป็นหลัก มีห้องทำงานที่มหาลัยให้แต่สามารถ Work From Home ได้
          ทำงานตั้งแต่ 9.00 - 17.00 รับทั้งหมด 3 คน
        </Text>
     {/* ต้องทำเป็นflatlist แสดงคุณสมบัติ */}
        {/* คุณสมบัติ */}

        <Text style={styles.subTitle}>คุณสมบัติ:</Text>

        <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
          ๐ ประสบการณ์ 5ปีขึ้นไป
        </Text>
        <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
          ๐ ประสบการณ์ 5ปีขึ้นไป
        </Text>
        <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
          ๐ ประสบการณ์ 5ปีขึ้นไป
        </Text>
        <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
          ๐ ประสบการณ์ 5ปีขึ้นไป
        </Text>
        <Text style={{ ...styles.subText, ...{ marginLeft: 20 } }}>
          ๐ ประสบการณ์ 5ปีขึ้นไป
        </Text>

        {/* ระยะงาน */}
  
        <Text style={styles.subTitle}>ระยะเวลางาน:</Text>
        <Text style={styles.subText}>10ปี</Text>
        {/* ค่าจ้าง */}

        <Text style={styles.subTitle}>ค่าจ้าง:</Text>
        <Text style={styles.subText}>10k</Text>

        {/* สวัสดิการ */}
        <Text style={styles.subTitle}>สวัสดิการ</Text>
        <Text style={styles.subText}>ป่วยไปหาหมอ</Text>
        {/* ช่องทางติดต่อ */}
        <Text style={styles.subTitle}>ช่องทางติดต่อ</Text>
        <Text style={styles.subText}>Email: yoyo</Text>

        <Text style={styles.subText}>เบอร์โทร: yoyo</Text>

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
            <Text style={{ ...styles.subText, ...{} }}>สุดยอดฮาฟฟู้ว</Text>
          </View>
        </View>
    
    
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    
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
    marginLeft: 20,
    // backgroundColor:"blue"
    
  },
  detailText: {
    fontSize: 11,
    color: "#929090",
    marginLeft: 10,
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
});

export default FindJobDetailScreen;
