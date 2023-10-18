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

const KeepScreen = ({ route, navigation }) => {
  const DATA = [
    {
      id: "1",
      Agency: "KMITL",
      position: "Frontend Dev",
    },
    {
      id: "2",
      Agency: "KMITL",
      position: "Frontend Dev",
    },
    {
      id: "3",
      Agency: "KMITL",
      position: "Frontend Dev",
    },
  ];
  const Item = ({ Agency }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FindJobDetailScreen");
      }}
    >
      <View style={{ ...styles.item, ...{ backgroundColor: "white" } }}>

        {/* ชื่อหน่วยงาน */}
        <Text style={styles.title} numberOfLines={2}>
          KMITL
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
    <View style={styles.screen}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor:"#ABA7FA",
  },
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
