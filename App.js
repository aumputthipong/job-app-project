// import
import React from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers } from "redux";
import mealsReducer from "./store/reducers/mealsReducer";
import { Provider } from "react-redux";
import MyNavigator from "./navigation/MyNavigator";
// ทำrootreducer เชื่อมกับทุกreducer
const rootReducer = combineReducers({
  meals: mealsReducer
  })
//สร้างstore กลาง 
const store = createStore(rootReducer);
  
// main
export default function App() {
  return (
    <Provider store={store}><MyNavigator/></Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
