import React ,{useState,useEffect}from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useSelector } from "react-redux"; 
import firebase from "../../database/firebaseDB";
const KeepScreen = ({ route, navigation }) => {
  // const [displayedFavoriteJobs, setDisplayedFavoriteJobs] = useState([]);
  // const currentUserId = firebase.auth().currentUser.uid;
  // const availableFavJobs = useSelector((state) => state.jobs.favoriteJobs);
  const currentUserId = firebase.auth().currentUser.uid;

 
  const availableJob = useSelector((state) => state.jobs.filteredJobs);
  const FavJobs = useSelector((state) => state.jobs.favoriteJobs);
  const myFavs = FavJobs.filter((fav)=> fav.userId == currentUserId);


const displayedJobs = availableJob.filter((job) => myFavs.some((fav) => fav.postId === job.id));
  // console.log(AvailableFavJobs)

  const renderJobItem = ({ itemData }) => (

  
    <TouchableOpacity
displayedJob      onPress={() => {
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
        <Text style={styles.subText}>{itemData.wages} บาท/{itemData.employmentType}</Text>
        {/* เงื่อนไข */}
        {itemData.attributes.map((attribute, index) => (
        <Text style={styles.detailText} key={index}>-{attribute}</Text>
        ))}
    
        <Text style={{...styles.detailText,...{ alignSelf: "flex-start", bottom: 10, position: 'absolute' },}}>

        </Text>
      </View>
    </TouchableOpacity>
    
    
  );

  // useEffect(() => {
    
  // }, []);
  

  return (

    <View style={styles.container}>

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
});

export default KeepScreen;
