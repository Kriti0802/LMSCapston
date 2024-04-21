const mongoose = require('mongoose');  
  
const fileSchema = new mongoose.Schema({  
  filename: {  
    type: String,  
    required: true,  
  },  
  // Other file metadata fields  
});  
  
const File = mongoose.model('File', fileSchema);  
  
module.exports = File;  
