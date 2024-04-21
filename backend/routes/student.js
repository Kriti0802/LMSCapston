const express = require('express');  
const router = express.Router();  
const multer = require('multer');  
const upload = multer();  
const Student = require('../models/student');  
const { uploadFileToBlobStorage } = require('../database/azureBlobStorage');  
 
// Get all students  
router.get('/', (req, res) => {  
  Student.find({"userrole":"Learner"})  
    .then((students) => res.json(students))  
    .catch((err) => res.status(400).json('Error: ' + err));  
});  
 
// Add a new student  
router.post('/add', (req, res) => {  
  const newStudent = new Student({  
    id: req.body.id,  
    fname: req.body.fname,  
    lname: req.body.lname,  
    email: req.body.email,  
    password: req.body.password,  
    userrole: req.body.userrole  
  });  
 
  newStudent  
    .save()  
    .then(() => res.json('Student added!'))  
    .catch((err) => res.status(400).json('Error: ' + err));  
});  
 
// Update a student  
router.put('/update/:id', (req, res) => {  
 
  console.log(req);
  Student.findById(req.params.id)  
    .then((student) => {  
      student.fname = req.body.fname;  
      student.lname = req.body.lname;  
      student.email = req.body.email;  
     
 
      student  
        .save()  
        .then(() => res.json('Student updated!'))  
        .catch((err) => res.status(400).json('Error: ' + err));  
    })  
    .catch((err) => res.status(400).json('Error: ' + err));  
});  
 
// Delete a student  
router.delete('/:id', (req, res) => {  
  Student.findByIdAndDelete(req.params.id)  
    .then(() => res.json('Student deleted!'))  
    .catch((err) => res.status(400).json('Error: ' + err));  
});  
 
// Upload files  
router.post('/upload', upload.fields([  
  { name: 'thumbnail', maxCount: 1 },  
  { name: 'video', maxCount: 1 },  
  { name: 'courseId', maxCount: 1 }  
]), (req, res) => {  
  const thumbnailFile = req.files['thumbnail'][0];  
  const videoFile = req.files['video'][0];  
  const courseId = req.body.courseId;  
 
  // Call the uploadFileToBlobStorage function for thumbnail  
  const thumbnailFileName = `${courseId}_thumbnail`;  
  uploadFileToBlobStorage(thumbnailFile, thumbnailFileName)  
    .then(() => {  
      // Call the uploadFileToBlobStorage function for video  
      const videoFileName = `${courseId}_video`;  
      return uploadFileToBlobStorage(videoFile, videoFileName);  
    })  
    .then(() => {  
      res.status(200).json('Files uploaded successfully.');  
    })  
    .catch((error) => {  
      console.error(error);  
      res.status(500).json('Error uploading files.');  
    });  
});  
 
module.exports = router;  