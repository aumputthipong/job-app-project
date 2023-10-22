// import Category from "../models/category";
import firebase from "../database/firebaseDB";

import Job from "../models/Jobs";

export const JOBS = [];
const jobPostsCollection = firebase.firestore().collection('JobPosts');

jobPostsCollection.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const jobData = doc.data();
    const jobId = doc.id;
    // Include the document ID as part of the data
    const jobWithId = { id: jobId, ...jobData };
    JOBS.push(jobWithId);
  });
});

export const setupJobPostsListener = () => {
  return jobPostsCollection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const jobId = change.doc.id;
      const jobData = change.doc.data();
      const jobWithId = { id: jobId, ...jobData };

      if (change.type === "added") {
        // Handle new job post
        JOBS.push(jobWithId);
      } else if (change.type === "modified") {
        // Handle modified job post
        const index = JOBS.findIndex((job) => job.id === jobId);
        if (index !== -1) {
          JOBS[index] = jobWithId;
        }
      } else if (change.type === "removed") {
        // Handle removed job post
        const index = JOBS.findIndex((job) => job.id === jobId);
        if (index !== -1) {
          JOBS.splice(index, 1);
        }
      }
    });
  });
};