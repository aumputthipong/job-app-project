import React from "react";
import { View, Text, Button, StyleSheet,ScrollView ,Image} from "react-native";
import { useSelector } from "react-redux";
const HireJobDetailScreen = ({route, navigation}) => {

const hireid = route.params.id;
  const availableHire = useSelector((state) => state.hires.filteredHires);
  const displayedHire = availableHire.find(hire => hire.id == hireid);

  const displayedUsers = useSelector((state) => state.users.users);

  const postOwner =  displayedUsers.find(user => user.id ==displayedHire.postById )
  // console.log(postOwner)
  return (
    <ScrollView style={styles.screen}>
      <Image
          source={{uri:postOwner.imageUrl}}
          style={{ ...styles.profileImg, ...{} }}
        ></Image>
    <Text>{postOwner.firstName} {postOwner.lastName}</Text>


    <Text>{postOwner.job}</Text>

    
    <Text>{displayedHire.hireTitle}</Text>
    <Text>{displayedHire.detail}</Text>
    <Text>ช่องทางติดต่อ</Text>
    <Text>{displayedHire.phone}</Text>
    <Text>{displayedHire.email}</Text>
        
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  profileImg: {
    marginTop: 10,
    marginLeft: 10,
    width: 75,
    height: 75,
    borderRadius: 360,
  },
});

export default HireJobDetailScreen;
