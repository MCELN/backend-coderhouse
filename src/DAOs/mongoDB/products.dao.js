const Products = require('../../models/products.model');

class ProductsDao {
    async find() {
        return await Products.find();
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

    async updateOne(id, prop, value) {
        const upQuery = {};
        upQuery[prop] = value;
        const productUpdate = await Products.updateOne({ _id: id }, { $set: upQuery });
        return productUpdate;
    };

    async deleteOne(id) {
        await Products.deleteOne({ _id: id });
    };
};

module.exports = ProductsDao;