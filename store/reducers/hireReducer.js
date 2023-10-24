import { HIRES } from "../../data/Hires-data";
// import { TOGGLE_FAVORITE } from "../actions/jobAction";
// import { LINK_JOB } from "../actions/jobAction";


const initialState = {
    hires: HIRES,
    filteredHires:HIRES ,
    selectedHire:HIRES[0] ,
    favoriteHires: []
    };

    const hiresReducer = (state = initialState, action) => {
        switch (action.type) {
            // case TOGGLE_FAVORITE:
                
            //     const updatedFavoriteJobs = [...state.favoriteJobs];
            //     const favIndex = updatedFavoriteJobs.findIndex((jobId) => jobId === action.jobId);
    
            //     if (favIndex === -1) {
            //         updatedFavoriteJobs.push(action.jobId);
            //         console.log('push', updatedFavoriteJobs);
            //         console.log('favIndex', favIndex);
            //     }
            //     else {
            //         updatedFavoriteJobs.splice(favIndex, 1);
            //         console.log('splice');
            //     }
            //     return {
            //         ...state,
            //         favoriteJobs: updatedFavoriteJobs, 
            //     };
                
            //     case LINK_JOB:
                
                // const selectedJob = [...state.favoriteJobs];
    
               
    
            default:
                return state;
        }
    }
    
    export default hiresReducer;