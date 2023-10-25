const Users = require('./models/users.model');

class UsersDao {
    async getAll() {
        try {
            return await Users.find();
        } catch (error) {
            throw error;
        };
    };

    async getById(id) {
        try {
            return await Users.findById(id);
        } catch (error) {
            throw error;
        };
    };

    async getOne(prop) {
        try {
            return await Users.findOne(prop);
        } catch (error) {
            throw error;
        };
    };

    async updateOne(id, userInfo) {
        try {
            return await Users.updateOne({ _id: id }, { $set: userInfo });
        } catch (error) {
            throw error;
        };
    };

    async create(userInfo) {
        try {
            const newUser = await Users.create(userInfo);
            return newUser;
        } catch (error) {
            throw error;
        };
    };
};

module.exports = UsersDao;