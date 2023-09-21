const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render(
        'register',
        {
            style: 'home.css',
        },
    );
});

module.exports = router;