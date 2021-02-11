const router = require('express').Router();
const mongoose = require('mongoose');
const Classroom = require('../models/Classroom');
const User = require('../models/User')

router.post('/addclassRoom',(req,res,next)=>{
    const currentUser = req.body.user ;
    const key = Math.random().toString(36).substring(6);
    User.findOne({user : currentUser})
    .then(user=>{
        console.log(user);
        if (!user){
            const newUser = new User({
                user : currentUser,
                classroom : [key]
            });
            newUser.save()
            .then(()=>{
                const classroom = createClassroom(currentUser,key);
                return res.status(201).json(classroom)
            })
            .catch(err=>{
                return res.status(500).json("Server Error");
            });
        }
        else{
            user.classroom.push(key);
            user.save()
            .then(()=>{
                const classroom = createClassroom(currentUser,key);
                return res.status(201).json(classroom)
            })
            .catch(err=>{
                return res.status(500)
            })
            
        }
    })

    
});

const createClassroom = (user,key) =>{
    const classroom = new Classroom({
        title : "data Structures and algorithms",
        author : user,
        description : "Assignment for session 2021-2022",
        key : key,
        link : `/${key}`
    });
    classroom.save()
    .then(()=>{
        return key;
    })
    .catch((err)=>{
        return err;
    })
    return classroom;
}


router.post('/classroomList',(req,res,next)=>{
    const userID =req.body.user;
    console.log(userID);
    User.findOne({user : userID})
    .then((user)=>{
        if (!user){
            return res.status(200).json([]);
        }
        const classrooms = user.classroom;
        const promises = Classroom.find({key : { $in: classrooms }}).exec();
        promises.then((classes)=>{
            return res.status(201).json(classes);
        })
        .catch((err)=>{
            return res.status(500).json("Server Error");
        })
    })
    .catch((err)=>{
        return res.status(400).json(err);
    })
});


module.exports = router;