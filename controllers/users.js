const express = require('express')
const router = express.Router()
const User = require('../models/user')
const isLoggedIn = require('../middleware/isLoggedIn')




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



// display logs
router.get('/:userId/logs', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.render('logs/index', { user })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})


// edit 
router.get('/:userId/logs/:logId/edit', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const log = user.gymLogs.id(req.params.logId)

    if (!log) {
      return res.status(404).send('Log not found')
    }

    res.render('logs/edit', { user, log })
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
})




// show form
router.get('/:userId/logs/new', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.render('logs/new.ejs', { user })
  } catch (err) {
    console.log(err)
    res.redirect(`/users/${req.params.userId}/logs`)
  }
})




// update func
router.put('/:userId/logs/:logIndex', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    user.gymLogs[req.params.logIndex] = req.body
    await user.save()
    res.redirect(`/users/${user._id}/logs`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// remove
router.delete('/:userId/logs/:logIndex', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    user.gymLogs.splice(req.params.logIndex, 1)
    await user.save()
    res.redirect(`/users/${user._id}/logs`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
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


router.post('/:userId/logs', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    user.gymLogs.push(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/logs`)
  } catch (err) {
    console.log(err)
    res.redirect(`/users/${req.params.userId}/logs/new`)
  }
})



module.exports = router