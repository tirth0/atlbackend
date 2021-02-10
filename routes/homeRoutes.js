const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User')


router.get('/classroomList',(req,res,next)=>{
    const userID ='lol';
    console.log('request received');
    User.find({user : userID})
    .then((user)=>{
        return res.status(200).json(user);
    })
    .catch((err)=>{
        return res.status(400).json(err);
    })
});


module.exports = router;