const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {db} = require('./database/firebase.js')


app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'Images'); // Folder where the images will be saved
  },
  filename: (req, file, cb)=> {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.set("view engine","ejs");

// api
// อัพรูป
app.post("/upload", upload.single('image'),(req,res)=>{
  res.send("Image Uploaded");
})
// addPost
app.post("/addJobPost", async(req,res)=>{
  const {name,status} = req.body
  const JobPostRef = db.collection('people').doc('associates')
  const res = await JobPostRef.set{
    // [jobTitle]:status

  }
})

app.get('/api', (req, res) => {
  // Handle the uploaded image, save its information to a database, etc.
  res.json({ "User":["jojo","jojo"] });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});