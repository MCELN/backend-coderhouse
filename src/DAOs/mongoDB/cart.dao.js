const Cart = require('../../models/cart.model');
const { updateOneProduct } = require('../../services/products.service');
const Products = require('./products.dao');

const ProductsDao = new Products();

class CartDao {

    async findAll() {
        try {
            return await Cart.find();
        } catch (error) {
            throw error;
        }
    };

    async findById(id) {
        try {
            return await Cart.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findOne(prop) {
        try {
            return await Cart.findOne(prop).lean();
        } catch (error) {
            throw error;
        }
    };


    async createCart() {
        try {
            const newCart = await Cart.create({ products: [] });
            return newCart._id;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(cid) {
        try {
            return await Cart.updateOne({ _id: cid })
        } catch (error) {
            return (error, 'No se pudo actualizar')
        };
    };
}

module.exports = CartDao;