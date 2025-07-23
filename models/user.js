//import mongoose
const mongoose = require('mongoose')

//define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

//based on the schema create a user
const User = mongoose.model('User', userSchema)

//export user module
module.exports = User