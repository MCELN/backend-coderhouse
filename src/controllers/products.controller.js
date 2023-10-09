const { Router } = require('express');
const protectedRoute = require('../middlewares/protected-route');
const { paginateProducts, findByIdProduct, createProduct, updateOneProduct, deleteProduct } = require('../services/products.service');
const { findByIdCart } = require('../services/carts.service');

const router = Router();

router.get('/', protectedRoute, async (req, res) => {
    try {

        const user = req.session.user;
        const cart = await findByIdCart(req.session.user.cart);
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

        const products = await paginateProducts(filter, queryOption);
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


router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await findByIdProduct(pid);
        if (product) {
            res.json({ message: product });
        } else {
            res.status(404).json({ error: `El producto con id: ${pid} no ha sido encontrado.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
})



router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail = [], code, status, category, stock } = req.body;

        if (!title || !description || !price || !code || !category || !stock) return res.status(400).json({ status: 'error', message: 'Faltan llenar campos.' })

        const productStatus = status === 'on' ? true : false;

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            status: productStatus,
            category,
            stock,
        };

        const response = await createProduct(newProduct);
        res.status(201).json({ status: 'success', payload: response });
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido agregar el producto.' });
    }
})



router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = findByIdProduct(pid);
        const modProp = Object.keys(req.body);
        if (modProp.includes('id')) {
            res.json({ message: `La id del producto no puede ser modificada` });
        }
        if (modProp.length > 0 && product) {
            for (const prop of modProp) {
                await updateOneProduct(pid, prop, req.body[prop]);
            }
            res.json({ message: `${product.title} ha sido modificado.` });
        } else if (!product) {
            res.status(404).json({ message: `El producto con id ${pid} no ha sido encontrado.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido agregar el producto.' });
    }
})



router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const exists = findByIdProduct(pid);
        if (exists) {
            await deleteProduct(pid);
            res.json({ message: `${exists.title} ha sido eliminado.` })
        } else {
            res.status(404).json({ message: `El producto con id: ${pid} no existe.` })
        }
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido agregar el producto.' });
    }
})

module.exports = router;