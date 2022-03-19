const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Structure
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt :{
        type: Date,
    }
});

module.exports = User =  mongoose.model('user', userSchema);