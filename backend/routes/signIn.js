const express = require('express');  
const router = express.Router();  
const user = require('../controller/user');  
  
router.post('/login', user.login);  
router.post('/signup', user.signup);  
router.get("/getRole",user.getRole)
module.exports = router;  
