const protectedAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.status === 'admin') {
            next();
        } else {
            res.redirect('/products');
        };
    } else {
        res.redirect('/login');
    }
}

module.exports = protectedAdmin;