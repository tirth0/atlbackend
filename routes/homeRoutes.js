const router = require('express').Router();
const mongoose = require('mongoose');
const Classroom = require('../models/Classroom');
const User = require('../models/User')


router.get('/classroomList',(req,res,next)=>{
    const userID = req.body.user;
    User.find({user : userID})
    .then((user)=>{
        return res.status(200).json(user);
    })
    .catch((err)=>{
        return res.status(400).json(err);
    })
});


module.exports = router;