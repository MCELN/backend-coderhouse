const bcrypt = require('bcrypt');

const getHashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
};

module.exports = {
    getHashPassword,
    comparePassword,
};