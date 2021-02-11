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

const UserSchema = new Schema({
    user : {
        type : String,
        required  : true
    },
    classroom : {
        type : [String],
    }
});

const User = mongoose.model('user',UserSchema);
module.exports = User;