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