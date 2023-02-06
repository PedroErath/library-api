const mongoose = require('mongoose')

const book = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    publishCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pages: {
        type: Number,
        default: 0
    },
    categoty: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Books', book)
