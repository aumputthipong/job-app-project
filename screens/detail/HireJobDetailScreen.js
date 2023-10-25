import React,{useState} from "react";
import { View, Text, Modal, Button, StyleSheet,ScrollView ,Image,TouchableOpacity,TextInput} from "react-native";
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

  const [commentBox, setCommentBox] = useState(""); 
  const availableUser = useSelector((state) => state.users.users);
  const availableComment= useSelector((state) => state.hires.comments);
  const thisPostComment = availableComment.filter((comment=> comment.postId ==hireid))
  const thisFliteredPostComment = thisPostComment.map(comment => {
  const user = availableUser.find(user => user.id === comment.userId);
  return {
    ...comment, 
    userId: user.id,
    userImage: user.imageUrl,
    userfistName: user.firstName,
    userlastName: user.lastName, 
  };
});
const currentUserImg = availableUser.find(user=> user.id ==currentUserId);
  const sentComment = ()=>{
    if (commentBox.trim() !== "") {
  
      // ล้าง TextInput
      firebase.firestore().collection("HireComments").add({
        postId: hireid,
        userId: currentUserId,
        comment: commentBox,
      })
      .then(() => {
        console.log('Job added to comment on Firebase');
      })
      .catch((error) => {
        console.error('Error adding job to favorites: ', error);
      });
      setCommentBox("");
    }
  }
  
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "ต้องการสิทธิ์การเข้าถึง",
        "โปรดอนุญาติการเข้าถึงไฟล์รูปรูปภาพในเครื่องของคุณ."
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const EditImage = async () => {
    const uploadUri = image;
    if (uploadUri) {
      let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

      try {
        const response = await fetch(uploadUri);
        const blob = await response.blob();
        const uploadTask = firebase
          .storage()
          .ref()
          .child(`images/${filename}`)
          .put(blob);
        // abcdes
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle upload progress if needed
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            // Handle upload error
            console.error("Upload Error: ", error);
          },
          () => {
            // Upload completed successfully, get the download URL
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(async (downloadURL) => {
                // Save the download URL to Firestore or use it as needed
                const postById = firebase.auth().currentUser.uid;
                console.log("File available at", downloadURL);
                const post = {
                  jobTitle,
                  position,
                  agency,
                  attributes,
                  welfareBenefits,
                  imageUrl: downloadURL,
                  wage,
                  category,
                  employmentType,
                  email,
                  phone,
                  postById,
                  createdAt: new Date(), 
                  // เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการใน post object
                };
                const postRef = firebase.firestore().collection("JobPosts");
                const docRef = await postRef.add(post);
                console.log("Post created with ID: ", docRef.id);
                navigation.navigate("FindJobScreen");
              });
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("No image to upload");
    }
  };
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
{/* กล่องคอมเม้น */}
<Text style={{ ...styles.subText, ...{ marginTop: 30 } }}>
          ความคิดเห็น 1 รายการ
        </Text>
        {/* ช่องพิมพ์คอมเม้น + รูปโปรไฟล์ */}
        <View style={{...styles.commentRow,...{ marginVertical:10,}}}>
        <Image
            source={{uri:currentUserImg.imageUrl|| "https://firebasestorage.googleapis.com/v0/b/log-in-d8f2c.appspot.com/o/profiles%2FprofilePlaceHolder.jpg?alt=media&token=35a4911f-5c6e-4604-8031-f38cc31343a1&_gl=1*51075c*_ga*ODI1Nzg1MDQ3LjE2NjI5N6JhaZ1Yx5r1r15r1h&_ga_CW55HF8NVT*MTY5ODA2NzU0NC4yNy4xLjE2OTgwNjgyMjEuMTcuMC4w"}}
            style={{...styles.commentImg,...{}}}
          ></Image>
        <TextInput
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          value={commentBox}
          onChangeText={(text) => setCommentBox(text)}
          maxLength={30}
          numberOfLines={3}
          placeholder="แสดงความคิดเห็น"
        />
        {/* ปุ่มส่งคอมเม้น */}
         <TouchableOpacity style={{marginTop:20,marginLeft:10}} onPress={sentComment} >
          <MaterialCommunityIcons name='send' size={20} color="black" />
          </TouchableOpacity>
        </View>
{/* ต้องทำเป็นflatlist แสดงคอมเม้น */}
        {/* คอมเม้นทางบ้าน */}
        {thisFliteredPostComment.map((comment, index) => (
       
 
        <View style={{...styles.commentRow,...{ marginVertical:10,}}}key={index}>
          <Image
            source={{uri:    comment.userImage || "https://firebasestorage.googleapis.com/v0/b/log-in-d8f2c.appspot.com/o/profiles%2FprofilePlaceHolder.jpg?alt=media&token=35a4911f-5c6e-4604-8031-f38cc31343a1&_gl=1*51075c*_ga*ODI1Nzg1MDQ3LjE2NjI5N6JhaZ1Yx5r1r15r1h&_ga_CW55HF8NVT*MTY5ODA2NzU0NC4yNy4xLjE2OTgwNjgyMjEuMTcuMC4w"}}
            style={{...styles.commentImg,...{}}}
          ></Image>
          <View>
            <Text style={{ ...styles.subTitle, ...{ marginTop: 10 } }}>
             {comment.userfistName} {comment.userlastName}
            </Text>
            <Text style={{ ...styles.subText, ...{} }}>   {comment.comment} </Text>
          </View>
        </View>
             ))}



    
    {
  currentUserId === displayedHire.postById && (
    <TouchableOpacity style={styles.editbutton} onPress={() => {navigation.navigate("EditHire", {
      id: displayedHire.id});}}>
        <MaterialCommunityIcons name='comment-edit-outline' size={25} color="white" />
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
    paddingBottom: "20%",
  borderRadius:20},
  profileImg: {
    marginTop: 10,
    marginLeft: 10,
    width: 75,
    height: 75,
    borderRadius: 360,
  },
  editbutton:{
    position:"absolute",
    top: 20, 
    right: 20,
    backgroundColor: "#5A6BF5",
    width: 55,
    height: 55,
    borderRadius:30,
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
    backgroundColor: "#5A6BF5s",
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
  input: {
    width: 250,
    textAlign: "center",
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign:"left",
    marginLeft:15,
  },
  commentRow: {
    flexDirection: "row",
    // backgroundColor:"red",
  },
  commentHeader: {
    borderTopEndRadius:20,
    borderTopStartRadius:20,
    height: 200,
  },
 commentinput: {
    width: 250,
    textAlign: "center",
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlign:"left",
    marginLeft:15,
  },
commentImg: {
    marginTop: 10,
    marginLeft:10,
    width: 45,
    height: 45,
    borderRadius: 360,
  },
});

export default HireJobDetailScreen;
