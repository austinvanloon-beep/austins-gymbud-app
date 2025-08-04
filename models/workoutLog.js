const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  workoutType: { type: String, required: true },
  duration: Number,
  notes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})




module.exports = mongoose.model('WorkoutLog', logSchema)


