import firebase from "../database/firebaseDB";


export const JOBS = [];
const jobPostsCollection = firebase.firestore().collection('JobPosts');

// Create a real-time listener to fetch and update data when it changes
jobPostsCollection.onSnapshot((querySnapshot) => {
  JOBS.length = 0; // Clear the existing data

  querySnapshot.forEach((doc) => {
    const jobData = doc.data();
    const jobId = doc.id;
    // Include the document ID as part of the data
    const jobWithId = { id: jobId, ...jobData };
    JOBS.push(jobWithId);
  });
});

// Optionally, you can also handle any errors that occur during the real-time listener
jobPostsCollection.onSnapshot((querySnapshot) => {
  // Handle changes as before
}, (error) => {
  console.error("Error getting real-time updates: ", error);
});