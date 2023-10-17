export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const LINK_JOB = "LINK_JOB";

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, mealId: id };
   };

export const linkJobDetail = (id) => {
    return { type: LINK_JOB, jobId: id };
   };