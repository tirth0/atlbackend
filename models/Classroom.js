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

const classroom = mongoose.model('classroom',ClassroomSchema);
module.exports = classroom;