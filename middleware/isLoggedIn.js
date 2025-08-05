const isLoggedIn = (req, res, next) => {
  if (!req.session?.user) {
    return res.redirect('/auth/sign-in')
  }
  next()
}


module.exports = isLoggedIn


