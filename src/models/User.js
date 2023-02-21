const mongoose = require('mongoose')

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['A', 'E', 'C'],
        default: 'C'
    },
    favoriteBooks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        default: []
    },
    booksInCart: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            },
            quantity: {
                type: Number,
                default: 0,
            }
        }
    ],
    imageURL: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', user)