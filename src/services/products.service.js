const { ProductsDao } = require('../adapters/factory');
const ProductDto = require('../DTOs/product.dto');

const Products = new ProductsDao();

const getAll = async () => {
    try {
        return await Products.getAll();
    } catch (error) {
        throw error;
    }
}

const getById = async (id) => {
    try {
        return await Products.getById(id);
    } catch (error) {
        throw error;
    }
}

const getOne = async (prop, value) => {
    try {
        return await Products.getOne(prop, value);
    } catch (error) {
        throw error;
    }
}

const paginate = async (filter, queryOption) => {
    try {
        return await Products.paginate(filter, queryOption);
    } catch (error) {
        throw error;
    }
}

const create = async (productInfo) => {
    try {
        const {
            title,
            description,
            price,
            code,
            category,
            status,
            stock,
        } = productInfo;

        if (!title
            || !description
            || !price
            || !code
            || !category
            || !stock
        ) return 400;

        productInfo.status = status === 'on' ? true : false;
        const newProduct = new ProductDto(productInfo);
        const existsCode = await Products.getOne({ code });
        if (!existsCode) {
            const product = await Products.create(newProduct);
            return product;
        } else {
            return 400;
        }
    } catch (error) {
        throw error;
    }
}

const updateOne = async (id, productUpdate) => {
    try {
        const productUp = await Products.updateOne(id, productUpdate);
        return productUp;
    } catch (error) {
        throw error;
    }
}

const deleteOne = async (id) => {
    try {
        await Products.deleteOne(id);
        return;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAll,
    getById,
    getOne,
    create,
    updateOne,
    deleteOne,
    paginate,
}