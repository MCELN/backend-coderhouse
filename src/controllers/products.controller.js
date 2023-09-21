const { Router } = require('express');
const Products = require('../DAOs/mongoDB/products.dao');
const protectedRoute = require('../middlewares/protected-route');
const Cart = require('../DAOs/mongoDB/cart.dao');

const CartDao = new Cart;
const ProductsDao = new Products;

const router = Router();

router.get('/', protectedRoute, async (req, res) => {
    try {

        const user = req.session.user;
        const cart = await CartDao.findById(req.session.user.cart);
        const cid = cart._id;

        if (req.session.counter) {
            req.session.counter += 1;
        } else {
            req.session.counter = 1;
        }

        const flag = (req.session.counter === 1);

        const { limit = 10, page = 1, sort, query } = req.query;

        const pageNum = parseInt(page);

        let filter = {};

        if (query) {
            if (query === 'false' || query === 'true') {
                filter = { status: query }
            } else {
                filter = { category: query };
            }
        }

        const sortO = {};

        if (sort === 'asc') {
            sortO.price = 1;
        } else if (sort === 'desc') {
            sortO.price = -1;
        }

        const queryOption = {
            limit,
            page,
            sort: sortO,
        };

        const products = await ProductsDao.paginate(filter, queryOption);
        const prod = products.docs;
        const serializedMessages = prod.map(product => product.serialize());

        const { prevPage, nextPage, hasPrevPage, hasNextPage } = products;

        const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}${sort ? "&sort=" + sort : ""}${query ? "&query=" + query : ""}` : null;
        const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}${sort ? "&sort=" + sort : ""}${query ? "&query=" + query : ""}` : null;

        res.render(
            'products',
            {
                serializedMessages,
                prevLink,
                nextLink,
                user,
                cid,
                flag,
                style: 'home.css',
            }
        )

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Error al obtener los productos.' })
    }
})

module.exports = router;