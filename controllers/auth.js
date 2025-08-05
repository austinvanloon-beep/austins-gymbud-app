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
        username: req.body.username,
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
router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      console.log('User not found')
      return res.redirect('/auth/sign-in')
    }

    const match = await bcrypt.compare(req.body.password, user.password)
    if (match) {
      req.session.user = {
        _id: user._id,
        name: user.username,
      };
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