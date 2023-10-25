import { JOBS } from "../../data/Jobs-data";
import { TOGGLE_FAVORITE } from "../actions/jobAction";
import { LINK_JOB } from "../actions/jobAction";
import { FILTER_JOBS } from '../actions/jobAction';

const initialState = {
    jobs: JOBS,
    filteredJobs:JOBS ,
    selectedJob:JOBS[0] ,
    favoriteJobs: []
    };

    const jobsReducer = (state = initialState, action) => {
        switch (action.type) {
            case TOGGLE_FAVORITE:
                
                const updatedFavoriteJobs = [...state.favoriteJobs];
                const favIndex = updatedFavoriteJobs.findIndex((jobId) => jobId === action.jobId);
    
                if (favIndex === -1) {
                    updatedFavoriteJobs.push(action.jobId);
                    console.log('push', updatedFavoriteJobs);
                    console.log('favIndex', favIndex);
                }
                else {
                    updatedFavoriteJobs.splice(favIndex, 1);
                    console.log('splice');
                }
                return {
                    ...state,
                    favoriteJobs: updatedFavoriteJobs, 
                };
                
                case LINK_JOB:
                
                // const selectedJob = [...state.favoriteJobs];
                case FILTER_JOBS:
                    const { jobType, hireType, wages } = action;
                    // นี่คือตัวอย่างเพียงแค่เริ่มต้น คุณควรใช้เงื่อนไขที่เหมาะสมในการกรองงาน
                    const filteredJobs = state.jobs.filter((job) => {
                      return (
                        (jobType === '' || job.jobType === jobType) &&
                        (hireType === '' || job.hireType === hireType) &&
                        (wages === '' || job.wages === wages)
                      );
                    });
                    return { ...state, filteredJobs };
                
    
            default:
                return state;
        }
        
    }
    
    export default jobsReducer;