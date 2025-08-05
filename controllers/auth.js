const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// removed all flash AND community commands due to not being able to solve bugs
// (button response flashing / explore pages)


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
      password: hashedPassword
    })
    req.session.user = newUser
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.redirect('/');
    res.redirect('/auth/sign-up')
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
      req.session.errorMsg = ['Invalid password']
      return res.redirect('/auth/sign-in')
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
    res.redirect('/');
      return res.redirect('/auth/sign-in')
    }
    req.session.user = user
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.redirect('/');
    res.redirect('/auth/sign-in')
  }
})


// sign out
router.get('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})


module.exports = router


