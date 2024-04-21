const mongoose = require('mongoose');  
const File = require('./file');  
const courseSchema = new mongoose.Schema({  
  name: {  
    type: String,  
    required: true,  
  },  
  description: {  
    type: String,  
    required: true,  
  },  
  trainer: {  
    type: String,  
    required: true,  
  }, 
  trainerEmail:{
    type:String,
    required:true
  },
  difficulty: {  
    type: String,  
    enum: ['Beginner', 'Intermediate', 'Advanced']  
  }, 
  // fileName:{
  //   type:String
  // },
  //creatorUserId
  //enrolledUserIds
  // thumbnail:{
  //   type:File,

  // },
  // video:{
  //   type:File,
  // }
  thumbnail: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'File',  
  },  
  video: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'File',  
  }, 
  enrolledStudents:[{  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'student',  
  }]
});  
  
const Course = mongoose.model('Course', courseSchema);  
  
module.exports = Course;  
