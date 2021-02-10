const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Classroom = require('./Classroom')

const UserSchema = new Schema({
    user : {
        type : String,
        required  : true
    },
    classroom : {
        type : [Classroom],
        required : true
    }
});

const Classroom = mongoose.model('classroom',ClassroomSchema);
module.exports = Classroom;