const { Router } = require('express');
const protectedRoute = require('../middlewares/protected-route');
const { findOneCart } = require('../services/carts.service');

const router = Router();


router.get('/:cid', protectedRoute, async (req, res) => {
    try {
        const { cid } = req.params;
        const cartProducts = await findOneCart({ _id: cid });
        const products = cartProducts.products;


        res.render(
            'cart',
            {
                products,
                style: "home.css",
            });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
})

module.exports = router;