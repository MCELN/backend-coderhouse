const { Router } = require('express');
const Products = require('../DAOs/mongoDB/products.dao');
const protectedAdmin = require('../middlewares/protected-admin');

const ProductsDao = new Products();

const router = Router();

router.get('/', protectedAdmin, async (req, res) => {
    try {
        const products = await ProductsDao.find();
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