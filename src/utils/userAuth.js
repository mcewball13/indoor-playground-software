function isSignedIn(req, res, next) {
    if (!req.session.loggedIn) {
        res.render("/login");
    } else {
        next();
    }
}
module.exports = isSignedIn;
