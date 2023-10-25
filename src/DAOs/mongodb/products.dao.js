const Products = require('./models/products.model');

class ProductsDao {
    async getAll() {
        try {
            return await Products.find();
        } catch (error) {
            throw error;
        };
    };

    async getById(id) {
        try {
            return await Products.findById(id);
        } catch (error) {
            throw error;
        };
    };

    async paginate(filter, queryOption) {
        try {
            return await Products.paginate(filter, queryOption);
        } catch (error) {
            throw error;
        };
    };

    async create(productInfo) {
        try {
            const newProduct = await Products.create(productInfo);
            return newProduct._id;
        } catch (error) {
            throw error;
        };
    };

    async updateOne(id, upQuery) {
        try {
            return await Products.updateOne({ _id: id }, { $set: upQuery })
        } catch (error) {
            throw error;
        };
    };

    async deleteOne(id) {
        try {
            await Products.deleteOne({ _id: id });
        } catch (error) {
            throw error;
        };
    };
};

module.exports = ProductsDao;