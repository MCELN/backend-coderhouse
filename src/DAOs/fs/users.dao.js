const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class UsersDao {
    #path = '';
    #Users = [];

    constructor() {
        this.#path = (process.cwd() + '/src/dataFiles/users.json');
        try {
            const usersFile = fs.readFileSync(this.#path, 'utf-8');
            this.#Users = usersFile ? JSON.parse(usersFile) : [];
        } catch (error) {
            throw error;
        };
    };

    async getAll() {
        try {
            const users = await fs.promises.readFile(this.#path, 'utf-8j');
            if (!users) return [];
            return JSON.parse(users);
        } catch (error) {
            throw error;
        };
    };

    async getById(id) {
        try {
            return this.#Users.find(u => u.id === id);
        } catch (error) {
            throw error;
        };
    };

    async getOne({ prop: value }) {
        try {
            const result = this.#Users.find(u => u[prop] === value);
            return result;
        } catch (error) {
            throw error;
        };
    };

    async updateOne(id, userInfo) {
        try {
            try {
                const reqUser = Object.keys(userInfo);
                const props = ['first_name', 'last_name', 'email', 'age', 'password', 'role', 'status'];
                const modUser = reqUser.filter(u => props.includes(u));
                const index = this.#Users.findIndex(u => u.id === id);
                for (const prop of modUser) {
                    this.#Users[index][prop] = userInfo[prop];
                }
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#Users));
                return await this.getById(id);
            } catch (error) {
                throw error;
            }
        } catch (error) {

        }
    }

    async create(userInfo) {
        try {
            userInfo.id = uuidv4();
            this.#Users.push(userInfo);
            const response = await fs.promises.writeFile(this.#path, JSON.stringify(this.#Users));
            return response;
        } catch (error) {
            throw error;
        };
    };

    async
};