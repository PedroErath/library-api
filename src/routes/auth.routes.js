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
                const refreshToken = jwt.sign({ _id: user._id, type: user.type }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' })
                const token = jwt.sign({ refreshToken }, process.env.TOKEN_SECRET, { expiresIn: '900s' })

                res.json({
                    error: false,
                    refreshToken: refreshToken,
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
        const { refreshToken } = req.body
        const userWithTokenOK = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

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

router.post('/refreshtoken', (req, res) => {
    try {
        const { refreshToken } = req.body
        const token = jwt.sign({ refreshToken }, process.env.TOKEN_SECRET, { expiresIn: '900s' })

        res.json({ token })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

module.exports = router