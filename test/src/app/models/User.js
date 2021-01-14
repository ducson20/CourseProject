const mongoose = require('mongoose');

const UserScchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    displayName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // fullName:{
    //     type:String,
    //     require: true,
    // },
    email:{
        type: String,
        require: true,
    },
    password:{
        type:String,
        require: true,
    }
})

module.exports = mongoose.model('User', UserScchema);