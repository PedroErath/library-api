const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const authMiddleware = require('../middlewares/authMiddleware')

const User = require('../models/User')

router.get('/filter', authMiddleware, async (req, res) => {
    try {
        const users = await User.find(req.body)

        res.json({ users })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        res.set('teste', user._id)
        res.json(user)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find()

        res.json({ users })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.post('/', async (req, res) => {

    function passwordValidate(password) {
        let regex = /^(?=.*[@!#$%^&*()/\\])(?=.*[0-9])(?=.*[a-zA-Z])[@!#$%^&*()/\\a-zA-Z0-9]{8,64}$/;
        return regex.test(password)
    }

    try {
        const checkUserExist = await User.findOne({ email: req.body.email })
        const passwordOK = passwordValidate(req?.body?.password)

        if (!checkUserExist) {
            if (passwordOK) {
                const savedUser = await new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password),
                    type: req.body.type
                }).save()
                res.json({ savedUser })
            } else {
                res.json({
                    error: true,
                    message: 'The password must have a minimum of 8 characters and a maximum of 64, with numbers, letters and a special character'
                })
            }
        } else {
            res.json({
                error: true,
                message: 'This user already exist'
            })
        }
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.put('/:id', async (req, res) => {

    const checkUserExist = await User.findOne({ email: req.body.email })

    try {
        const { id } = req.params

        if (!checkUserExist) {
            const userUpdated = await User.findByIdAndUpdate(id, req.body, { 'returnDocument': 'after' })
            res.json({
                userUpdated
            })
        } else {
            res.json({
                error: true,
                message: 'This user already exist'
            })
        }
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.put('/favoritebook/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params

        const books = await User.findById(id).select('favoriteBooks')

        const bookIsFavorite = books.favoriteBooks.find(book => book == req.body.favoriteBooks)

        if (bookIsFavorite) {
            const delFavoritedBook = await User.findByIdAndUpdate(id, { $pull: { favoriteBooks: { $in: req.body.favoriteBooks } } }, { 'returnDocument': 'after' })
            res.json({
                delFavoritedBook
            })
        } else {
            const addFavoritedBook = await User.findByIdAndUpdate(id, { $push: req.body }, { 'returnDocument': 'after' })
            res.json({
                addFavoritedBook
            })
        }

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const userDeleted = await User.findByIdAndDelete(id)

        if(!userDeleted){
            res.status(400).json({
                error: true,
                message: 'User not found'
            })
        }else{
            res.json({ error: false })
        }
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

module.exports = router