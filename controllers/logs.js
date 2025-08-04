const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');


// handles logs! (similar to pantry items in cookbook)


router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.render('logs/index.ejs', { logs: user.logs, user })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})



router.get('/new', (req, res) => {
  res.render('logs/new.ejs', { userId: req.params.userId })
})



router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.logs.push(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/logs`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})




module.exports = router;


