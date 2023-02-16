require('dotenv').config()
require('./src/config/database')

const authorsRoute = require('./src/routes/authors.routes')
const booksRoute = require('./src/routes/books.routes')
const usersRoute = require('./src/routes/users.routes')
const authRoute = require('./src/routes/auth.routes')

const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    app.use(cors());
    next();
});

app.use('/books', booksRoute)
app.use('/authors', authorsRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute) 


app.listen(process.env.PORT, () => {
    console.log(`Server running in port: ${process.env.PORT}`)
})