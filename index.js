require('dotenv').config()
require('./src/config/database')

const authorsRoute = require('./src/routes/authors.routes')
const booksRoute = require('./src/routes/books.routes')

const express = require('express')
const { json } = require('express')
const app = express()

app.use(express.json())

app.use('/books', booksRoute)
app.use('/autors', authorsRoute)

app.use('/', (req, res) => {
    res.send('Curso de node')
})


app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`)
})