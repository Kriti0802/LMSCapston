const Student = require('../models/student');  
const Role = require("../models/Role");
const login = async(req, res) => {  
  const { email, password } = req.body;  
  // Check email  
  Student.findOne({ email: email }).then((student,err) => {  
    console.log(student);
    console.log(err);
    if (student) {  
      // Check password  
      if (password === student.password) {  
        res.send({ message: "Login successfully", student: student });  
      } else {  
        res.send({ message: "Incorrect password" });  
      }  
    } else {  
      res.send({ message: "Email not found" });  
    }  
  });  
};  
 
const signup = async (req, res) => {  
  const {id, fname, lname, email, password, userrole } = req.body;  
 
  try {  
    const existingStudent = await Student.findOne({ email: email });  
 
    if (existingStudent) {  
      res.send({ message: "Student is already registered" });  
    } else {  
      const newStudent = new Student({  
        id,
        fname,  
        lname,  
        email,  
        password,  
        userrole
      });  
 
      await newStudent.save();  
      res.send({ message: "Account has been created!! Please Login" });  
    }  
  } catch (error) {
    console.log(error)
    res.send(error);  
  }  
};  
const getRole = async (req, res) => {  
  try {  
    const existingRoles = await Role.find({});  
 
    if (existingRoles.length === 0) {  
      const roles = [  
        { id: "role-1", role: "Learner" },  
        { id: "role-2", role: "Trainer" }  
      ];  
 
      // Insert the data in the roles collection  
      await Role.insertMany(roles);  
    }  
 
    // Retrieve the data from the roles collection  
    const retrievedRoles = await Role.find({});  
 
    res.status(200).json(retrievedRoles);  
  } catch (err) {  
    console.log(err);  
    res.status(500).send("Some Error Occurred. Please try again!");  
  }  
};  
 
module.exports = {  
  login,  
  signup,  
  getRole  
};  
 