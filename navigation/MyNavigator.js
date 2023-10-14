import React from "react";
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/mealAction";
// import screen ที่เกี่ยวข้อง

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/reg/LoginScreen";
import RegisterScreen from "../screens/reg/RegisterScreen";
import FindJobScreen from "../screens/jobpost/FindJobScreen";
import HireJobScreen from "../screens/jobpost/HireJobScreen";
import FindJobDetailScreen from "../screens/detail/FindJobDetailScreen";
import HireJobDetailScreen from "../screens/detail/HireJobDetailScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";
import MyProfileScreen from "../screens/profile/MyProFileScreen";
import KeepScreen from "../screens/keep/KeepScreen";
import CreateFind from "../screens/create/CreateFind";
import CreateHire from "../screens/create/CreateHire";

// สร้าง navigator ตามโจทย์กำหนด


const HomeNavigator = createNativeStackNavigator();



const BottomTab = createBottomTabNavigator();
const MainNavigator = createNativeStackNavigator();

// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น
function HomeStack() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "#4769E2"},
        headerTintColor: "white",
      }}
    >
      <HomeNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
        }}
      />
      <HomeNavigator.Screen
        name="FindJobScreen"
        component={FindJobScreen}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
      <HomeNavigator.Screen
        name="HireJobScreen"
        component={HireJobScreen}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
      <HomeNavigator.Screen
        name="FindJobDetailScreen"
        component={FindJobDetailScreen}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
      <HomeNavigator.Screen
        name="HireJobDetailScreen"
        component={HireJobDetailScreen}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
            <HomeNavigator.Screen
        name="CreateFind"
        component={CreateFind}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
            <HomeNavigator.Screen
        name="CreateHire"
        component={CreateHire}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
    </HomeNavigator.Navigator>
  );
}

// BottomTabNav หน้าหลัก,ที่บันทึกไว้,แจ้งเตือน,โปรไฟล์
function BottomTabNav() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        //  headerShown: false,
        tabBarActiveTintColor: "black",
        headerStyle: {      backgroundColor: "#4769E2",},
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { fontSize: 15 },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          
          tabBarIcon: ({ tintColor }) => {
            return (
              <Ionicons name="ios-home" size={24} color={tintColor} />
            );
          },
          tabBarOptions: { tabBarActiveTintColor: "blue" },
        }}
      />
      <BottomTab.Screen
        name="MyKeep"
        component={KeepScreen}
        options={{
        
          tabBarIcon: () => {
            return <Ionicons name="ios-save" size={24} color="gray" />;
          },
        }}
      />
      <BottomTab.Screen
        name="Notifcation"
        component={NotificationScreen}
        options={{
          
          tabBarIcon: () => {
            return <Ionicons name="ios-notifications" size={24} color="gray" />;
          },
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="ios-person" size={24} color="gray" />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}


// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator
         initialRouteName="Welcome"
        screenOptions={{
          // headerShown: false,
          drawerActiveTintColor: "orange",
          drawerInactiveTintColor: "gray",
        }}
      >
        <MainNavigator.Screen
          name="BottomTabNav"
          component={BottomTabNav}
          options={{
            drawerLabel: "Meals",
          }}
        />
        <MainNavigator.Screen name="Welcome" component={WelcomeScreen} />
        <MainNavigator.Screen name="Login" component={LoginScreen} />
        <MainNavigator.Screen name="Register" component={RegisterScreen} />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}
