import { JOBS } from "../../data/Jobs-data";
import { TOGGLE_FAVORITE } from "../actions/jobAction";
import { LINK_JOB } from "../actions/jobAction";
import { FILTER_JOBS } from '../actions/jobAction';

const initialState = {
    jobs: JOBS,
    filteredJobs:JOBS ,
    filterJob: JOBS,
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

                const { selected } = action;
                    if (selected.length === 0) {
                        // ถ้าไม่มีค่าที่ถูกเลือก ให้แสดงทั้งหมด
                        return { ...state, filterJob: state.jobs };
                      }
                    
                      // ดำเนินการกรองโพสต์ตามค่าที่ถูกเลือก
                      const filteredJobs = state.jobs.filter((job) => {
                        return selected.includes(job.category);
                      });
                      
                      return { ...state, filterJob: filteredJobs };
                

    
            default:
                return state;
        }
        
    }
    
    export default jobsReducer;