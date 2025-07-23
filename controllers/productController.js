const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const isSignedIn = require('../middleware/is-signed-in')
const uploadImage = require('../config/multer')

//View add product form
router.get('/addNewProduct', isSignedIn, (req, res) => {
    res.render('products/addNewProduct.ejs')
})

//Post from data to database
router.post('/', isSignedIn, uploadImage.single('image'), async (req, res) =>  {
    
    try{
        req.body.seller = req.session.user._id
        req.body.image = {
            url: req.file.path,
            cloudinary_id: req.file.filename
        }

        await Product.create(req.body)
        res.redirect('/products')

    }

    catch (error){
        console.log(error)
        res.send('Something went wrong')
    }
})


//view the all product page
router.get('/', async (req, res) => {

    const foundProducts = await Product.find()
    console.log(foundProducts)
    res.render('products/allProduct.ejs', {foundProducts: foundProducts})

})

//view the view product page
router.get('/:productId', async (req, res) => {
    try{

        const foundProducts = await Product.findById(req.params.productId).populate('seller').populate('Comments.author')
        console.log(foundProducts)
        res.render('products/viewProduct.ejs', { foundProducts: foundProducts })
    
    } catch (error){
        console.log(error)
        // res.redirect('/')
        res.send('something went wrong')
    }
})

//delete the product from database
router.delete('/:productId', isSignedIn, async (req, res) => {

    const foundProducts = await Product.findById(req.params.productId).populate('seller')

    if(foundProducts.seller._id.equals(req.session.user._id)){
        await foundProducts.deleteOne()
        return res.redirect('/products')
    }

    return res.send('Not authorized')

})

//form view render the edit
router.get('/:productId/edit', isSignedIn, async (req, res) =>{
    const foundProducts = await Product.findById(req.params.productId).populate('seller')

    if(foundProducts.seller._id.equals(req.session.user._id)){
        return res.render('products/editProduct.ejs', { foundProducts: foundProducts })
    }
    return res.send('Not authorized')
})

//update the product by it id
router.put('/:productId', isSignedIn, async (req, res) =>{

    const foundProducts = await Product.findById(req.params.productId).populate('seller')

    //check if the user logged-in is the product owner
    if(foundProducts.seller._id.equals(req.session.user._id)){
        
        //delete the image from cloudinary if a new image was uploaded
        if(req.file && foundProducts.image?.cloudinary_id){
            await cloudinary.uploader.destroy(foundProducts.image.cloudinary_id)
            foundProducts.image.url = req.file.path
            foundProducts.image.cloudinary_id = req.file.filename
        }

        //update the product fields
        foundProducts.title = req.body.title
        foundProducts.description = req.body.description
        foundProducts.price = req.body.price

        await foundProducts.save() 
        return res.redirect(`/products/${req.params.productId}`)
    
    }

    return res.send('not authorized')

})

//from the database post the comment
router.post('/:productId/comments', isSignedIn, async (req, res) =>{

    const foundProducts = await Product.findById(req.params.productId)
    req.body.author = req.session.user._id
    console.log(req.body)
    foundProducts.Comments.push(req.body)
    await foundProducts.save()
    res.redirect(`/products/${req.params.productId}`)

})

module.exports = router