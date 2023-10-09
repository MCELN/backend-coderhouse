const ProductsDao = require('../DAOs/mongoDB/products.dao');

const Prodcuts = new ProductsDao();

const findProducts = async () => {
    try {
        return await Prodcuts.find();
    } catch (error) {
        throw error;
    }
}

const findByIdProduct = async (id) => {
    try {
        return await Prodcuts.findById(id);
    } catch (error) {
        throw error;
    }
}

const paginateProducts = async (filter, queryOption) => {
    try {
        return await Prodcuts.paginate(filter, queryOption);
    } catch (error) {
        throw error;
    }
}

const createProduct = async (productInfo) => {
    try {
        return await Prodcuts.create(productInfo);
    } catch (error) {
        throw error;
    }
}

const updateOneProduct = async (id, prop, value) => {
    try {
        const upQuery = {};
        upQuery[prop] = value;
        const productUpdate = await Products.updateOne(id, upQuery);
        return productUpdate;
    } catch (error) {
        throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        await Prodcuts.deleteOne(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findProducts,
    findByIdProduct,
    paginateProducts,
    createProduct,
    updateOneProduct,
    deleteProduct,
}