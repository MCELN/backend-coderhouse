const Users = require('../../models/users.model');

class UsersDao {

    async find() {
        return await Users.find();
    }

    async findById(id) {
        return await Users.findById(id);
    }

    async findOne(prop) {
        return await Users.findOne(prop);
    }

    async create(newUserInfo) {
        const newUser = await Users.create(newUserInfo);
        return newUser;
    }
}

module.exports = UsersDao;