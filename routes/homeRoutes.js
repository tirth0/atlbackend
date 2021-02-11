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
                createClassroom(currentUser,key);
                return res.status(201).json("Class Created,User Added")
            })
            .catch(err=>{
                return res.status(500).json("Server Error");
            });
        }
        else{
            user.classroom.push(key);
            user.save()
            .then(()=>{
                createClassroom(currentUser,key);
                return res.status(201).json("Class Created")
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
        key : key
    });
    classroom.save()
    .then(()=>{
        return key;
    })
    .catch((err)=>{
        return err;
    })
}


router.post('/classroomList',(req,res,next)=>{
    const userID =req.body.user;
    console.log(userID);
    User.findOne({user : userID})
    .then((user)=>{
        const classrooms = user.classroom;
        let promises = [];
        let classes = [];
        classrooms.forEach((elem,id)=>{
            promises.push(
                Classroom.findOne({key : elem.key})
            );
        });

       Promise.all(promises).then((c)=>{
            classes.push(c);
            return c;

       })
       .then((c)=>{
           console.log(c);
           res.status(201).json(c);
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