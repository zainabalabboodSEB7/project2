//import multer
const multer = require('multer')

//import the cloudinary storage
const { CloudinaryStorage } = require('multer-storage-cloudinary')

//import cloudinary
const cloudinary = require('./cloudinary')

//create a cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Project2-products',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
})

//export a multer
module.exports = multer({ storage: storage })
