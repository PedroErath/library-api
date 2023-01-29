const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1]

        if(!token) res.status(400).json({
            error: true,
            message: 'Token was not informed'
        })

        const userWithTokenOK = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}