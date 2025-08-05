const express = require('express')
const router = express.Router()
const User = require('../models/user')




// dashboard
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.render('users/show', { user })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})



router.get('/:userId/logs', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.render('logs/index', { user, logs: user.gymLogs })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})



router.get('/:userId/logs/new', (req, res) => {
  res.render('logs/new', { userId: req.params.userId })
})




// new log
router.post('/:userId/logs', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    user.gymLogs.push(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/logs`)
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})



module.exports = router