const Users = require('../../models/users.model');

class UsersDao {

    async find() {
        try {
            return await Users.find();
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Users.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findOne(prop) {
        try {
            return await Users.findOne(prop);
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id, userInfo) {
        try {
            return await Users.updateOne({ _id: id }, { $set: userInfo });
        } catch (error) {
            throw error;
        }
    }

    async create(newUserInfo) {
        try {
            const newUser = await Users.create(newUserInfo);
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersDao;