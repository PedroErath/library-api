const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Entrei na pag de livros')
})

module.exports = router