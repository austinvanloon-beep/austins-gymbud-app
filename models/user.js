const mongoose = require('mongoose')


// gym log schema
const gymLogSchema = new mongoose.Schema({
    date: String,
    notes: String,
    duration: Number,
    workoutType: String
})


// user , schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    gymLogs: [gymLogSchema]
})



const workoutLogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: Date,
    notes: String
})





module.exports = mongoose.model('User', userSchema)


