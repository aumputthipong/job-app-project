import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { CATEGORIES,} from "../data/dummy-data";
// import MealItem from "../components/MealItem";
import MealList from "../components/MealList";
import { useSelector } from "react-redux"; 

const CategoryMealsScreen = ({route, navigation}) => {

  const catId = route.params.id;


  
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals =   availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  // const displayedMeals = MEALS.filter(
  //   (meal) => meal.categoryIds.indexOf(catId) >= 0
  // );

  return (
    <View style={styles.screen}>
      <MealList listData={displayedMeals}   navigation={navigation}/>
      {/* <FlatList
        style={{ width: "100%" }}
        data={displayedMeals}
        renderItem={renderMealItem}
      /> */}
    </View>

    // ส่วนนี้ <View>...</View>ใช้เพื่อการทดลอง และให้คอมเมนต์โค้ดส่วนนี้และเรียกใช้ <FlatList> ข้างบนแทน
    // <View>
    //   <Text>Category Meals Screen!!</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
