const mongoose = require('mongoose')

const author = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nationality:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', author)