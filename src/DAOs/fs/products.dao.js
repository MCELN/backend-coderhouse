const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class ProductsDao {
    #path = '';
    #products = [];

    constructor() {
        this.#path = (process.cwd() + '/src/dataFiles/products.json');
        try {
            const productsFile = fs.readFileSync(this.#path, 'utf-8');
            this.#products = productsFile ? JSON.parse(productsFile) : [];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const products = await fs.promises.readFile(this.#path, 'utf-8');
            if (!products) return [];
            return JSON.parse(products);
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            return this.#products.find(p => p.id === id);
        } catch (error) {
            throw error;
        }
    }

    async getOne(prop, value) {
        try {
            const result = this.#products.find(p => p[prop] === value);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async create(productInfo) {
        try {
            productInfo.id = uuidv4();
            this.#products.push(productInfo);
            const response = await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id, productUpdate) {
        try {
            const reqProp = Object.keys(productUpdate);
            const props = ['title', 'description', 'price', 'thumbnail', 'code', 'status', 'category', 'stock'];
            const modProp = reqProp.filter(p => props.includes(p));
            const index = this.#products.findIndex(p => p.id === id);
            for (const prop of modProp) {
                this.#products[index][prop] = productUpdate[prop];
            }
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
            return await this.getById(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const index = this.#products.findIndex(p => p.id === id);
            this.#products.splice(index, 1);
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
            return;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductsDao;