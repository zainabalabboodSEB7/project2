const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    content: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: {
        url: { type: String, required: true },
        cloudinary_id: { type: String, require: true }
    },

    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    Comments: [commentSchema]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)