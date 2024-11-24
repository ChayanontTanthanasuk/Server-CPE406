const express = require('express');
const router = express.Router();
const { timp , list } = require ('../Controllers/tempcontroller/tempController')
// const { auth } = require('../Middleware/authMiddleware')

router.post('/timp', timp);
router.get('/list', list);

module.exports = router