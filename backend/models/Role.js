const mongoose = require('mongoose');
 
const roleSchema = new mongoose.Schema({
    id:{
        type:String,
    },
    role: {
        type: String,
        required: true,
    },
});
 
const Role = mongoose.model('Role', roleSchema);
 
module.exports = Role;  