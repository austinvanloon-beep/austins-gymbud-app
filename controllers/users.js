const express = require('express')
const router = express.Router()
const User = require('../models/user')
const isLoggedIn = require('../middleware/isLoggedIn')




router.get('/:userId', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.render('users/show.ejs', { user })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})




module.exports = router

