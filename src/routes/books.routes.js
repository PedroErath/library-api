const express = require('express')
const router = express.Router()

const Book = require('../models/Book')

router.get('/filter', async (req, res) => {
    try {
        const books = await Book.find(req.body)

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
        const book = await Book.findById(id)

        res.json(book)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})

        res.json({ books })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.post('/', async (req, res) => {
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
        }else{
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
        res.json({ error: false })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

module.exports = router