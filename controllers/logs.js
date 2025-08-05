const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/user')
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/:logId/edit', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).send('User not found')

    const log = user.logs.id(req.params.logId)
    if (!log) return res.status(404).send('Log not found')

    const logData = {
      ...log.toObject(),
      date: new Date(log.date)
    }

    res.render('logs/edit.ejs', { log: logData, user })
  } catch (error) {
    console.log(error)
    res.redirect(`/users/${req.params.userId}/logs`)
  }
})

router.get('/new', isLoggedIn, (req, res) => {
  res.render('logs/new.ejs', { userId: req.params.userId })
})

router.get('/:logId/edit', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).lean()
    if (!user) return res.status(404).send('User not found')

    const log = user.logs.find(log => log._id.toString() === req.params.logId)
    if (!log) return res.status(404).send('Log not found')

    log.date = new Date(log.date)

    res.render('logs/edit.ejs', { log, user })
  } catch (error) {
    console.log(error)
    res.redirect(`/users/${req.params.userId}/logs`)
  }
})

router.put('/:logId', isLoggedIn, async (req, res) => {
  try {
    const { workoutType, duration, date, notes } = req.body
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).send('User not found')

    const log = user.logs.id(req.params.logId)
    if (!log) return res.status(404).send('Log not found')

    log.workoutType = workoutType
    log.duration = duration
    log.date = date
    log.notes = notes

    await user.save()

    res.redirect(`/users/${req.params.userId}/logs`)
  } catch (error) {
    console.error(error)
    res.redirect(`/users/${req.params.userId}/logs`)
  }
})

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).send('User not found')

    user.logs.push(req.body)
    await user.save()

    res.redirect(`/users/${user._id}/logs`)
  } catch (error) {
    console.log(error)
    res.redirect(`/users/${req.params.userId}/logs/new`)
  }
})

router.delete('/:logId', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).send('User not found')

    user.logs.id(req.params.logId).remove()
    await user.save()

    res.redirect(`/users/${req.params.userId}/logs`)
  } catch (error) {
    console.error(error)
    res.redirect(`/users/${req.params.userId}/logs`)
  }
})

module.exports = router
