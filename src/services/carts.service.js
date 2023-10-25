const { CartsDao } = require('../adapters/factory');
const CartDto = require('../DTOs/cart.dto');
const productsService = require('../services/products.service');

const Carts = new CartsDao();

const getAll = async () => {
    try {
        return await Carts.getAll();
    } catch (error) {
        throw error;
    }
}

const getById = async (id) => {
    try {
        return await Carts.getById(id);
    } catch (error) {
        throw error;
    }
}

const getForHandlebars = async (prop) => {
    try {
        return await Carts.getForHandlebars(prop);
    } catch (error) {
        throw error;
    }
}

const create = async () => {
    try {
        const newCart = new CartDto();
        const response = await Carts.create(newCart);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateOne = async (id, products) => {
    try {
        const response = await Carts.updateOne(id, products);
        return response;
    } catch (error) {

    }
}

const insertOne = async (cid, pid, qty) => {
    try {
        const cart = await Carts.getById(cid);
        const product = await productsService.getById(pid);
        if (!product || !cart) return 400;

        const index = cart.products.findIndex(p => p.id === pid || p._id === pid);

        if (index >= 0) {
            if (product.stock >= qty) {
                await Carts.updateOne(cid, pid, qty)
                await productsService.updateOne(pid, { stock: (product.stock - qty) })
            } else {
                return 'Out of stock';
            }
        } else {
            if (product.stock >= qty) {
                const newProduct = {
                    id: pid,
                    quantity: qty
                };
                await Carts.updateOne(cid, pid, qty, newProduct)
                await productsService.updateOne(pid, { stock: (product.stock - qty) })
            } else {
                return 'Out of stock';
            };
        }

        return product;
    } catch (error) {
        throw error;
    }
}

const deleteOneProduct = async (id, pid) => {
    try {
        const response = await productsService.getById(pid);
        await Carts.deleteOneProduct(id, pid);
        return response.title;
    } catch (error) {
        throw error;
    }
}

const deleteAllProduct = async (id) => {
    try {
        await Carts.deleteAllProduct(id);
        return;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    getById,
    getForHandlebars,
    create,
    updateOne,
    insertOne,
    deleteOneProduct,
    deleteAllProduct,
}