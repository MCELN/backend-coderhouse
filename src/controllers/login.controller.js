const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    res.render(
        'login',
        {
            style: 'home.css',
        },
    );
});

router.delete('/', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({ status: 'error', error: 'Error al cerrar sesión' });
        } else {
            res.status(200).json({ status: 'success', });
        };
    });
});

module.exports = router;