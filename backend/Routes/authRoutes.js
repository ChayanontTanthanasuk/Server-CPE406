const express = require('express');
const router = express.Router();
const { register, login,getUsers  } = require('../Controllers/authcontrollers/authController');
// middlewaer


// http://localhost:3000/api/register

// get
router.get('/getUsers',getUsers); // get user
// post
router.post('/register', register); // user register 
router.post('/login', login); // user login





module.exports = router