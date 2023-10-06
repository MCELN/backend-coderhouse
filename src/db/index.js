const mongoose = require('mongoose');
const { db } = require('../config/index');

class MongoConnection {
    static #instance;

    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(
                `mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`,
            ),
                console.log('db is connected');
        } catch (error) {
            console.log(`${error} No se pudo establecer la conexión con la base de datos`);
        }
    }

    static getInstance() {
        if (this.#instance) {
            return this.#instance;
        }

        this.#instance = new MongoConnection();
        return this.#instance;
    }
}

module.exports = MongoConnection;