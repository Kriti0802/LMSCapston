const express = require('express');  
const cors = require('cors');  
const mongoose = require('mongoose');  
const app = express();  
require('dotenv').config();
const port = process.env.PORT || 5000;  
// const assessmentRoutes = require('./routes/assessmentRoutes');  
const courseRoutes = require('./routes/courseRoutes');  
const signIn=require('./routes/signIn');

 
app.use(cors());  
app.use(express.json());   
 
// Connect to MongoDB using the connection string  
const connectionString = 'mongodb+srv://snehamanna788:Test123@empdb.wqrc8xt.mongodb.net/?retryWrites=true&w=majority&appName=empdb';  
mongoose.connect(connectionString, {  
  // useNewUrlParser: true,  
  // useUnifiedTopology: true,  
});  
const connection = mongoose.connection;  
connection.once('open', () => {  
  console.log('Connected to MongoDB');  
});  
 

  

// Define your routes  
const studentRouter = require('./routes/student');  
app.use('/students', studentRouter);    


  
// app.use('/assessments', assessmentRoutes); 
app.use('/courses', courseRoutes);   
app.use(signIn);

// Start the server  
app.listen(port, () => {  
  console.log(`Server is running on port: ${port}`);  
});  

