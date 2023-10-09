const Products = require('../../models/products.model');

class ProductsDao {
    async find() {
        try {
            return await Products.find();
        } catch (error) {
            throw error;
        }
    };

    async findById(id) {
        return await Products.findById(id);
    };

    async paginate(filter, queryOption) {
        return await Products.paginate(filter, queryOption);
    };

    async create(newProductInfo) {
        const newProduct = await Products.create(newProductInfo);
        return newProduct._id;
    };

    async updateOne(id, upQuery) {
        try {
            return await Products.updateOne({ _id: id }, { $set: upQuery });
        } catch (error) {
            throw error;
        }
    };

    async deleteOne(id) {
        try {
            await Products.deleteOne({ _id: id });
        } catch (error) {
            throw error;
        }
    };
};

module.exports = ProductsDao;