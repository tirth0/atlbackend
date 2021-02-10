const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
    title : {
        type : String,
        required  : true
    },
    description : {
        type : String,
        required : true
    },
    key : {
        type : String,
        required : true
    }
});

const Classroom = mongoose.model('classroom',ClassroomSchema);
module.exports = Classroom;