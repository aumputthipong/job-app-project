import { JOBS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/jobAction";
import { LINK_JOB } from "../actions/jobAction";
const initialState = {
    jobs: JOBS ,
    filteredJobs:JOBS ,
    selectedJob:JOBS[0] ,
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
                
                case LINK_JOB:
                
                // const selectedJob = [...state.favoriteMeals];
    
               
    
            default:
                return state;
        }
    }
    
    export default mealsReducer;