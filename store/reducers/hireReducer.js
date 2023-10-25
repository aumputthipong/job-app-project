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
            default:
                return state;
        }
    }
    
    export default hiresReducer;