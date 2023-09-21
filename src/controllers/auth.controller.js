const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    try {
        res.status(201).json({ status: 'success', payload: req.user });
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo registrar el usuario' })
    }
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    try {
        req.session.user = {
            cart: req.user.cart,
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            status: req.user.status,
        };

        res.status(201).json({ status: 'success', payload: req.session.user });
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo acceder al servidor' });
    }
});

module.exports = router;