import { COMMENTS, HIRES } from "../../data/Hires-data";
// import { TOGGLE_FAVORITE } from "../actions/jobAction";
// import { LINK_JOB } from "../actions/jobAction";


const initialState = {
    hires: HIRES,
    filteredHires:HIRES ,
    selectedHire:HIRES[0] ,
    favoriteHires: [],
    comments:COMMENTS,
    };

    const hiresReducer = (state = initialState, action) => {
        switch (action.type) {
   
            default:
                return state;
        }
    }
    
    export default hiresReducer;