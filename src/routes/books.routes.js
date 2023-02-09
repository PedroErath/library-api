const express = require('express')
const router = express.Router()
const Multer = require('multer')

const Book = require('../models/Book')
const Author = require('../models/Author')
const authRoutes = require('../routes/auth.routes')
const uploadImage = require('../services/firebase')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = Multer({ storage: Multer.memoryStorage(), limits: { fileSize: 5000000 } })

router.get('/filter', async (req, res) => {
    try {
        if (req.body.author) {
            const author = await Author.findOne({ name: req.body.author })
            req.body.author = author?._id
        }

        const books = await Book.find(req.body).populate('author').exec()

        res.json({ books })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id).populate('author').exec()

        res.json(book)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const books = await Book.find().populate('author').exec()

        res.json({ books })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.post('/', multer.single('image'), uploadImage, async (req, res) => {

    const {error} = req.body

    if (error) res.json({
        error: true,
        message: error
    })
    try {
        const checkBookExist = await Book.findOne({ title: req.body.title, publishCompany: req.body.publishCompany })

        if (!checkBookExist) {
            const savedBook = await new Book(req.body).save()
            res.json({ savedBook })
        } else {
            res.json({
                error: true,
                message: 'This book already exist'
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

    const checkBookExist = await Book.findOne({ title: req.body.title, publishCompany: req.body.publishCompany })

    try {
        const { id } = req.params

        if (!checkBookExist) {
            const bookUpdated = await Book.findByIdAndUpdate(id, req.body, { 'returnDocument': 'after' })
            res.json({
                bookUpdated
            })
        } else {
            res.json({
                error: true,
                message: 'This book already exist'
            })
        }
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const bookDeleted = await Book.findByIdAndDelete(id)

        if(!bookDeleted){
            res.status(400).json({
                error: true,
                message: 'Book not found'
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