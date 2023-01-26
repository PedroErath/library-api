const mongoose = require('mongoose')

const book = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishCompany: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Books', book)
