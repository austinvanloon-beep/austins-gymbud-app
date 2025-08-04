const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// hashedPassword

// GET sign up
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

// POST sign up 
router.post('/sign-up', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        req.session.user = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})



// GET sign in
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})



// POST sign in
router.post('/sign-in', async ( req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            req.session.user = {
                _id: user._id,
                name: user.name,
                email: user.email
            }
            res.redirect('/')
         } else {
                res.redirect('/auth/sign-in')
            }
        } catch (error) {
            console.log(error)
            res.redirect('/auth/sign-in')
        }
})



// signs out
router.get('/sign-out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})



module.exports = router