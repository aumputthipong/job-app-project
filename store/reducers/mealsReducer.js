import { JOBS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/jobAction";
const initialState = {
    jobs: JOBS ,
    filteredJobs:JOBS ,
    favoriteJobs: []
    };

    const mealsReducer = (state = initialState, action) => {
        switch (action.type) {
            case TOGGLE_FAVORITE:
                
                const updatedFavoriteMeals = [...state.favoriteMeals];
                const favIndex = updatedFavoriteMeals.findIndex((mealId) => mealId === action.mealId);
    
                if (favIndex === -1) {
                    updatedFavoriteMeals.push(action.mealId);
                    console.log('push', updatedFavoriteMeals);
                    console.log('favIndex', favIndex);
                }
                else {
                    updatedFavoriteMeals.splice(favIndex, 1);
                    console.log('splice');
                }
                return {
                    ...state,
                    favoriteMeals: updatedFavoriteMeals, 
                };
                
                // case TOGGLE_FAVORITE:
                
                // const selectedJob = [...state.favoriteMeals];
    
                // if (favIndex === -1) {
                //     updatedFavoriteMeals.push(action.mealId);
                //     console.log('push', updatedFavoriteMeals);
                //     console.log('favIndex', favIndex);
                // }
                // else {
                //     updatedFavoriteMeals.splice(favIndex, 1);
                //     console.log('splice');
                // }
                // return {
                //     ...state,
                //     favoriteMeals: updatedFavoriteMeals, 
                // };
    
            default:
                return state;
        }
    }
    
    export default mealsReducer;