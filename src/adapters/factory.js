const { environment } = require("../configs");

switch (environment) {
    case 'devmongo':
        module.exports = {
            ProductsDao: require('../DAOs/mongodb/products.dao'),
            UsersDao: require('../DAOs/mongodb/users.dao.js'),
            CartsDao: require('../DAOs/mongodb/carts.dao.js'),
            ChatDao: require('../DAOs/mongodb/chat.dao.js'),
        };
        break;
    case 'devfs':
        module.exports = {
            ProductsDao: require('../DAOs/fs/products.dao'),
            UsersDao: require('../DAOs/fs/users.dao'),
            CartsDao: require('../DAOs/fs/carts.dao'),
            ChatDao: require('../DAOs/fs/chat.dao'),
        };
        break;
    case 'prod':
        module.exports = {
            products: require('../DAOs/mongodb/products.dao.js'),
            users: require('../DAOs/mongodb/users.dao.js'),
            carts: require('../DAOs/mongodb/carts.dao.js'),
            chat: require('../DAOs/mongodb/chat.dao.js'),
        };
        break;
}