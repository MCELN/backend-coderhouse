const { Router } = require('express');
const protectedRoute = require('../middlewares/protected-route');

const router = Router();

router.get('/', protectedRoute, async (req, res) => {
    try {
        const user = req.session.user;
        res.json({ message: user });
    } catch (error) {
        res.json({ error: error })
    }
})

module.exports = router;