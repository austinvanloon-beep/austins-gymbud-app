const mongoose = require('mongoose')



// log schema
const gymLogSchema = new mongoose.Schema({
  date: String,
  notes: String,
  duration: Number,
  workoutType: String
})



// user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  gymLogs: [gymLogSchema]
})




module.exports = mongoose.model('User', userSchema)


