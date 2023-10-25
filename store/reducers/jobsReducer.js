import { JOBS,FAVORITEJOBS } from "../../data/Jobs-data";
import { TOGGLE_FAVORITE } from "../actions/jobAction";
import { LINK_JOB } from "../actions/jobAction";


const initialState = {
    jobs: JOBS,
    filteredJobs:JOBS ,
    selectedJob:JOBS[0] ,
    favoriteJobs: FAVORITEJOBS
    };

    const jobsReducer = (state = initialState, action) => {
        switch (action.type) {
            case TOGGLE_FAVORITE:
                
                const updatedFavoriteJobs = [...state.favoriteJobs];
                const favIndex = updatedFavoriteJobs.findIndex((jobId) => jobId === action.jobId);
    
                if (favIndex === -1) {
                    updatedFavoriteJobs.push(action.jobId);
                    console.log('push', updatedFavoriteJobs);
                    console.log(updatedFavoriteJobs);
                }
                else {
                    updatedFavoriteJobs.splice(favIndex, 1);
                    console.log(updatedFavoriteJobs);
                }
                return {
                    ...state,
                    favoriteJobs: updatedFavoriteJobs, 
                };
                
                case LINK_JOB:
                
                // const selectedJob = [...state.favoriteJobs];
    
               
    
            default:
                return state;
        }
    }
    
    export default jobsReducer;