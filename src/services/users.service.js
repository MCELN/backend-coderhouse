const { UsersDao } = require('../adapters/factory');
const cartService = require('../services/carts.service');
const UserDto = require('../DTOs/user.dto');
const { getHashPassword } = require('../utils/bcrypt.util');

const Users = new UsersDao();

const getAll = async () => {
    try {
        return await Users.getAll();
    } catch (error) {
        throw error;
    };
};

const getById = async (id) => {
    try {
        return await Users.getById(id);
    } catch (error) {
        throw error;
    };
};

const getOne = async (prop) => {
    try {
        return await Users.getOne(prop);
    } catch (error) {
        throw error;
    };
};

const updateOne = async (id, userInfo) => {
    try {
        return await Users.updateOne(id, userInfo);
    } catch (error) {
        throw error;
    };
};

const create = async (userInfo) => {
    try {
        const {
            first_name,
            last_name,
            email,
            age,
            password
        } = userInfo;

        if (!first_name || !last_name || !email || !age || !password) return 'Bad request';

        const newUser = new UserDto(userInfo);
        const user = await getOne({ email: userInfo.email });
        if (user) return 'Usuario en uso';

        newUser.cart = await cartService.create();
        const pass = getHashPassword(newUser.password);
        newUser.password = pass;

        const resultUser = await Users.create(newUser);

        return resultUser;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    getAll,
    getById,
    getOne,
    updateOne,
    create,
}