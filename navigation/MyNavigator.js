import React from "react";
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/jobAction";
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
import EditFind from "../screens/edit/EditFind";
import EditHire from "../screens/edit/EditHire";
import EditNoti from "../screens/edit/EditNoti";
import OtherProfileScreen from "../screens/profile/OtherProfileScreen";


// สร้าง navigator ตามโจทย์กำหนด


const HomeNavigator = createNativeStackNavigator();
const NotiNavigator = createNativeStackNavigator();


const BottomTab = createBottomTabNavigator();
const MainNavigator = createNativeStackNavigator();

// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น
function HomeStack() {
  const dispatch = useDispatch();
  const toggleFavoriteHandler = (mealId) => {
    dispatch(toggleFavorite(mealId));
  };
  return (
    <HomeNavigator.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "#4769E2" },
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
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="MealDetail" iconName="ios-star" onPress={() => { toggleFavoriteHandler(route.params.id) }} />
            </HeaderButtons>),
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
      <HomeNavigator.Screen
        name="EditHire"
        component={EditHire}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
      <HomeNavigator.Screen
        name="EditFind"
        component={EditFind}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
        <HomeNavigator.Screen
        name="OtherProfile"
        component={OtherProfileScreen}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />


    </HomeNavigator.Navigator>
  );
}

function NotiStack() {
  return (
    <NotiNavigator.Navigator
      initialRouteName="NotificationScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "#4769E2" },
        headerTintColor: "white",
      }}
    >
      <NotiNavigator.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{}
        }
      />
      <NotiNavigator.Screen
        name="EditNoti"
        component={EditNoti}
        options={({ route }) => ({
          // title: route.params.title,
          // id: route.params.id,
        })}
      />
    </NotiNavigator.Navigator>
  );
}

// BottomTabNav หน้าหลัก,ที่บันทึกไว้,แจ้งเตือน,โปรไฟล์
function BottomTabNav() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        //  headerShown: false,
        tabBarActiveTintColor: "#EC8032",
        headerStyle: { backgroundColor: "#4769E2", },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { fontSize: 15, color: 'black' },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,

          tabBarIcon: ({ tintColor }) => {
            return (
              <Ionicons name="ios-home-outline" size={24} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="MyKeep"
        component={KeepScreen}
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Ionicons name="bookmark-outline" size={24}  />;
          },
        }}
      />
      <BottomTab.Screen
        name="Notifcation"
        component={NotiStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor }) => {
            return <Ionicons name="notifications-outline" size={24}  />;

          },
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{

          tabBarIcon: ({ tintColor }) => {
            return <Ionicons name="ios-person-outline" size={24} />;
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
            headerShown: false,
          }}
        />
        <MainNavigator.Screen name="Welcome" component={WelcomeScreen}
          options={{
            headerStyle: { backgroundColor: "#4769E2" },
            headerTitleStyle: { color: "white" }
          }}
        />
        <MainNavigator.Screen name="Login" component={LoginScreen}
          options={{
            headerStyle: { backgroundColor: "#4769E2" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
        <MainNavigator.Screen name="Register" component={RegisterScreen}
          options={{
            headerStyle: { backgroundColor: "#4769E2" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}