const { Router } = require('express');
const Cart = require('../DAOs/mongoDB/cart.dao');
const Products = require('../DAOs/mongoDB/products.dao');
const protectedRoute = require('../middlewares/protected-route');

const ProductsDao = new Products();
const CartDao = new Cart();

const router = Router();


router.get('/:cid', protectedRoute, async (req, res) => {
    try {
        const { cid } = req.params;
        const cartProducts = await CartDao.findOne({ _id: cid });
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