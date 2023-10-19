const firebase=require('firebase');


const firebaseConfig = {
    apiKey: "AIzaSyBTZjh7pBW2CgvURxkE7htlQRzZy2-eOok",
    authDomain: "log-in-d8f2c.firebaseapp.com",
    projectId: "log-in-d8f2c",
    storageBucket: "log-in-d8f2c.appspot.com",
    messagingSenderId: "944792465509",
    appId: "1:944792465509:web:3ba1a815db14689746968c",
    measurementId: "G-2Q793VQJ03"
};



firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const JobPost = db.collection("๋JobPosts");
module.exports = JobPost;