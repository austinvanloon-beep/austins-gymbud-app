const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const path = require('path')
require('dotenv').config()
const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})


app.use(express)
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.set('view engine', 'ejs')




app.get('/', (req, res) => {
    res.send(`GymBud is running on port ${PORT}`)
})

const PORT = process.env.PORT ? process.env.PORT : '3000';
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})