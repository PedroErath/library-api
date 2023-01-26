require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database is UP')
    })
    .catch(error => {
        console.log(`Error database connection: ${error}`)
    })