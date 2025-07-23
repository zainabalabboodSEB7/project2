//check if the user  signed in
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next()
    res.redirect('/auth/sign-in')
}

//export isSignedIn
module.exports = isSignedIn