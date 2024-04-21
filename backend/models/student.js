const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: {
    type: String,

  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userrole: {
    type: String,
    required: true

  },
  coursesEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',}],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;  
