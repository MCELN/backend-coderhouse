const UsersDao = require('../DAOs/mongoDB/users.dao');

const Users = new UsersDao();

const findUsers = async () => {
    try {
        return await Users.find();
    } catch (error) {
        throw error
    }
}

const findByIdUser = async (id) => {
    try {
        return await Users.findById(id);
    } catch (error) {
        throw error;
    }
}

const findOneUser = async (prop) => {
    try {
        return await Users.findOne(prop)
    } catch (error) {
        throw error;
    }
}

const updateOneUser = async (id, userInfo) => {
    try {
        return await Users.updateOne(id, userInfo);
    } catch (error) {
        throw error;
    }
}

const createUser = async (userInfo) => {
    try {
        return await Users.create(userInfo);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findUsers,
    findByIdUser,
    findOneUser,
    createUser,
};