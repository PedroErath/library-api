require('dotenv').config()
require('./src/config/database')

const autorsRoute = require('./src/routes/autors.routes')
const booksRoute = require('./src/routes/books.routes')

const express = require('express')
const app = express()

app.use('/books', booksRoute)
app.use('/autors', autorsRoute)

app.use('/', (req, res) => {
    res.send('Curso de node')
})


app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`)
})