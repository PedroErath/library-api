const mongoose = require('mongoose')

const user = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ['A', 'E'],
        default: 'E'
    },
    phoneNumber:{
        type: String
    }
})

module.exports = mongoose.model('User', user)