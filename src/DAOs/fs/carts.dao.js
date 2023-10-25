const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class CartsDao {
    #path = '';
    #carts = [];

    constructor() {
        this.#path = (process.cwd() + '/src/dataFiles/carts.json');
        try {
            const cartsFile = fs.readFileSync(this.#path, 'utf-8');
            this.#carts = cartsFile ? JSON.parse(cartsFile) : [];
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const carts = await fs.promises.readFile(this.#path, 'utf-8');
            if (!carts) return [];
            return JSON.parse(carts)
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const result = await this.#carts.find(c => c.id === id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async create(cartInfo) {
        try {
            cartInfo.id = uuidv4();
            this.#carts.push(cartInfo);
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
            return cartInfo.id;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id, pid, qty, newProduct = null) {
        try {
            const index = this.#carts.findIndex(p => p.id === id);
            const productIndex = this.#carts[index].products.findIndex(p => p.id === pid);
            if (!newProduct) {
                this.#carts[index].products[productIndex].quantity += qty;
            } else {
                this.#carts[index].products.push(newProduct);
            };
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
            return this.#carts[index].products;
        } catch (error) {
            throw error;
        }
    }

    async deleteOneProduct(id, pid) {
        try {
            const index = this.#carts.findIndex(p => p.id === id);
            const productIndex = this.#carts[index].products.findIndex(p => p.id === pid);
            this.#carts[index].products.splice(productIndex, 1);
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
            return;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllProduct(id) {
        try {
            const index = this.#carts.findIndex(p => p.id === id);
            const allProd = this.#carts[index].products.length;
            this.#carts[index].products.splice(0, allProd);
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
            return;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CartsDao;