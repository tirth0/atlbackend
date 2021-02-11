const router = require('express').Router();
const mongoose = require('mongoose');
const Classroom = require('../models/Classroom');
const User = require('../models/User')

router.post('/addclassRoom',(req,res,next)=>{
    console.log(req.body);
    const key = Math.random().toString(36).substring(6);
    const classroom = new Classroom({
        title : "data Structures and algorithms",
        author : req.body.currentUser,
        description : "Assignment for session 2021-2022",
        key : key
    });

    classroom.save()
    .then(()=>{
        res.status(201).json(key);
    })
    .catch((err)=>{
        res.status(500).json("Could Not Create Class");
    })
});


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