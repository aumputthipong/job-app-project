const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where the images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  // Handle the uploaded image, save its information to a database, etc.
  res.json({ message: 'Image uploaded successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});