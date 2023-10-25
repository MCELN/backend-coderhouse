const { Router } = require('express');
const cartService = require('../services/carts.service');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const carts = await cartService.getAll();
        res.json({ message: carts })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartProducts = await cartService.getById(cid);
        res.json({ message: cartProducts });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
})

router.post('/', async (req, res) => {
    try {
        const answer = await cartService.create();
        res.json({ message: `${answer}` });
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido crear el carrito.' });
    }
})

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const answer = await cartService.updateOne(cid);
        res.json({ message: `${answer}` })
    } catch (error) {
        res.status(500).json({ error: 'No se pudo actualizar.' });
    };
});

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const qty = req.body.quantity;

        const answer = await cartService.insertOne(cid, pid, qty);
        res.json({ message: `${answer}` });

    } catch (error) {
        res.status(500).json({ error: 'No se ha podido agregar el producto.' });
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const answer = await cartService.deleteOneProduct(cid, pid);

        res.json({ message: `${answer}` });
    } catch (error) {
        res.status(500).json({ error: 'No se ha podido eliminar el producto.' });
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const answer = await cartService.deleteAllProduct(cid);

        res.json({ message: `${answer}` });
    } catch (error) {
        res.status(500).json({ error: 'No se limpiado el carrito.' })
    }
})

module.exports = router;