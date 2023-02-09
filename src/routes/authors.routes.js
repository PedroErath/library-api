const express = require('express')
const router = express.Router()

const Author = require('../models/Author')

router.get('/filter', async (req, res) => {
    try {
        const authors = await Author.find(req.body)

        res.json({ authors })
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
        const author = await Author.findById(id)

        res.json(author)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({})

        res.json({ authors })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const checkAuthorExist = await Author.findOne({ name: req.body.name, nationality: req.body.nationality })

        if (!checkAuthorExist) {
            const savedAuthor = await new Author(req.body).save()
            res.json({ savedAuthor })
        } else {
            res.json({
                error: true,
                message: 'This author already exist'
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

    const checkAuthorExist = await Author.findOne({ title: req.body.name, nationality: req.body.nationality })

    try {
        const { id } = req.params

        if (!checkAuthorExist) {
            const AuthorUpdated = await Author.findByIdAndUpdate(id, req.body, { 'returnDocument': 'after' })
            res.json({
                AuthorUpdated
            })
        }else{
            res.json({
                error: true,
                message: 'This author already exist'
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
        const AuthorDeleted = await Author.findByIdAndDelete(id)

        if(!AuthorDeleted){
            res.status(400).json({
                error: true,
                message: 'Author not found'
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