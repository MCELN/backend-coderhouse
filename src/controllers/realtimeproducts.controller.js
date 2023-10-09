const { Router } = require('express');
const protectedAdmin = require('../middlewares/protected-admin');
const { findProducts } = require('../services/products.service');

const router = Router();

router.get('/', protectedAdmin, async (req, res) => {
    try {
        const products = await findProducts();
        const serializedMessages = products.map(product => product.serialize());

        res.render(
            'realtimeproducts',
            {
                serializedMessages,
                style: 'home.css',
            }
        );
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

module.exports = router;