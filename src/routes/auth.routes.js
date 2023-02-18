require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const passwordOk = bcrypt.compareSync(req.body.password, user.password)

            if (passwordOk) {
                const token = jwt.sign({id: user._id, type: user.type, name:user.name}, process.env.TOKEN_SECRET, { expiresIn: '24h' })

                res.json({
                    error: false,
                    token: token
                })
            } else {
                res.json({
                    error: true,
                    message: 'Invalid password'
                })
            }
        } else {
            res.json({
                error: true,
                message: 'User does not exist'
            })
        }
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

router.post('/verifytoken', (req, res) => {
    try {
        const { token } = req.body
        const userWithTokenOK = jwt.verify(token, process.env.TOKEN_SECRET)

        res.json({
            error: false,
            user: userWithTokenOK
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

module.exports = router