import firebase from "../database/firebaseDB";

export const HIRES = [];
const hirePostsCollection = firebase.firestore().collection('HirePosts');

// Create a real-time listener to fetch and update data when it changes
hirePostsCollection.onSnapshot((querySnapshot) => {
  HIRES.length = 0; // Clear the existing data

  querySnapshot.forEach((doc) => {
    const hireData = doc.data();
    const hireId = doc.id;
    // Include the document ID as part of the data
    const hireWithId = { id: hireId, ...hireData };
    HIRES.push(hireWithId);
  });
});

// Optionally, you can also handle any errors that occur during the real-time listener
hirePostsCollection.onSnapshot((querySnapshot) => {
  // Handle changes as before
}, (error) => {
  console.error("Error getting real-time hirePosts updates: ", error);
});