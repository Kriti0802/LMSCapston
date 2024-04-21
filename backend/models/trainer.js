const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  coursesTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;  
