const loginController = require('../controllers/login.controller');
const productsController = require('../controllers/products.controller');
const registerController = require('../controllers/register.controller');
const authController = require('../controllers/auth.controller');
const cartController = require('../cart/controller.cart');
const cartViewController = require('../controllers/cartViews.controller');

const router = (app) => {
    app.use('/login', loginController);
    app.use('/register', registerController);
    app.use('/products', productsController);
    app.use('/auth', authController);
    app.use('/api/carts', cartController);
    app.use('/carts', cartViewController);
}

module.exports = router;