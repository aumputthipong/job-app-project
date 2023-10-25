export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const LINK_JOB = "LINK_JOB";
export const FILTER_JOBS = 'FILTER_JOBS';

export const filterJobs = (jobType, hireType, wages) => {
  return {
    type: FILTER_JOBS,
    jobType,
    hireType,
    wages,
  };
};

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, jobId: id };
   };

export const linkJobDetail = (id) => {
    return { type: LINK_JOB, jobId: id };
   };