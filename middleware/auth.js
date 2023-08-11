// Call passport auth

module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        // Redirect if auth fails
        res.redirect('/')
      }
    }
  }
  