const express= require('express');
const router= express.Router()

const user= require('./user');
const todo= require('./userdata');
router.use('/user',user);
router.use('/todo', todo);


module.exports= router;