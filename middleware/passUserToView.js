const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user || null
  res.locals.successMsg = req.session.successMsg || []
  res.locals.errorMsg = req.session.errorMsg || []
  req.session.successMsg = []
  req.session.errorMsg = []

  next()
}

module.exports = passUserToView
