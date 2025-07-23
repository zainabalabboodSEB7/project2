//pass the logged in user information to the view
const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
}

//export passUserToView
module.exports = passUserToView