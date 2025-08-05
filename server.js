const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const path = require('path')
require('dotenv').config()
const app = express()
const session = require('express-session')
const passUserToView = require('./middleware/passUserToView')
const isLoggedIn = require('./middleware/isLoggedIn')
const authController = require('./controllers/auth')
const userController = require('./controllers/users')
const logsController = require('./controllers/logs')
const usersRouter = require('./controllers/users')
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passUserToView)
app.use('/auth', authController);
app.use('/users', userController);
app.use('/users', usersRouter)
app.use('/users/:userId/logs', isLoggedIn, logsController)
app.set('view engine', 'ejs')


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  next()
})




// temp
app.get('/new', isLoggedIn, (req, res) => {
  res.send("This is the /new route")
})


app.get('/', (req, res) => {
  res.render('home', { user: req.session.user })
})



const PORT = process.env.PORT ? process.env.PORT : '3000'
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})