function isAuthenticated(req, res, nex) {
    if (req.session && req.session.user) return next()
    else res.redirect('/login')
}

function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') return next()
    else res.redirect('/signup')
}

module.exports = { isAuthenticated, isAdmin }