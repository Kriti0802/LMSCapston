const express = require('express');  
const router = express.Router();  
const courseController = require('../controller/courseController');  
const blobController = require('../database/azureBlobStorage');
  

router.get('/', courseController.getAllCourses);
router.post('/create', courseController.createCourse);    
router.get('/:id', courseController.getCourseById);  
router.put('/:id', courseController.updateCourse);  
router.delete('/:id', courseController.deleteCourse);  
router.get("/courseImage/:id",blobController.getFileFromBlobStorage);
router.get("/courseVideo/:id", blobController.getFileFromBlobStorage);
router.post("/enrollment", courseController.enrollStudentInCourse);  
router.post("/getEnrolledCourses",courseController.getEnrolledCourses);
router.post("/derollCourse",courseController.derolledCourses);

module.exports = router;  
