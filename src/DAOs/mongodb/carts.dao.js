const Cart = require('./models/carts.model');

class CartsDao {
    async getAll() {
        try {
            return await Cart.find();
        } catch (error) {
            throw error;;
        };
    };

    async getById(id) {
        try {
            return await Cart.findById(id);
        } catch (error) {
            throw error;
        };
    };

    async getForHandlebars(id) {
        try {
            return await Cart.findById(id).lean();
        } catch (error) {
            throw error;
        }
    }

    async create(cartInfo) {
        try {
            const newCart = await Cart.create(cartInfo);
            return newCart._id;
        } catch (error) {
            throw error;
        };
    };

    async updateOne(id) {
        try {
            return await Cart.updateOne({ _id: id });
        } catch (error) {
            throw error;
        };
    };
};

module.exports = CartsDao;