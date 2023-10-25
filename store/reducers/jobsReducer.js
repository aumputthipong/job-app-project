import { JOBS,FAVORITEJOBS, COMMENTS } from "../../data/Jobs-data";
import { TOGGLE_FAVORITE } from "../actions/jobAction";
import { LINK_JOB } from "../actions/jobAction";
import firebase from "../../database/firebaseDB";

const initialState = {
    jobs: JOBS,
    filteredJobs:JOBS ,
    selectedJob:JOBS[0] ,
    favoriteJobs: FAVORITEJOBS,
    comments:COMMENTS,
    };

    const jobsReducer = (state = initialState, action) => {
        switch (action.type) {
            case TOGGLE_FAVORITE:
                const currentUserId = firebase.auth().currentUser.uid;
                const updatedFavoriteJobs = [...state.favoriteJobs];
                const favIndex = updatedFavoriteJobs.findIndex((job) => job.postId === action.jobId && job.userId === currentUserId);
            
                if (favIndex === -1) {  
                    updatedFavoriteJobs.push( {postId:action.jobId,userId:currentUserId});
                    // console.log('push', updatedFavoriteJobs);
                    // console.log(updatedFavoriteJobs);
                    firebase.firestore().collection("FavoriteJobs").add({
                        postId: action.jobId,
                        userId: currentUserId
                    })
                    .then(() => {
                        console.log('Job added to favorites on Firebase');
                    })
                    .catch((error) => {
                        console.error('Error adding job to favorites: ', error);
                    });
                }
                else {
                    updatedFavoriteJobs.splice(favIndex, 1);
                    firebase.firestore().collection("FavoriteJobs")
                    .where("postId", "==", action.jobId)
                    .where("userId", "==", currentUserId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            doc.ref.delete().then(() => {
                                console.log('Job removed from favorites on Firebase');
                            }).catch((error) => {
                                console.error('Error removing job from favorites: ', error);
                            });
                        });
                    })
                    .catch((error) => {
                        console.error('Error removing job from favorites: ', error);
                    });
                   
                }
                console.log(  updatedFavoriteJobs)
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