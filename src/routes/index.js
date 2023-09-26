const loginController = require('../controllers/login.controller');
const productsController = require('../controllers/products.controller');
const registerController = require('../controllers/register.controller');
const authController = require('../controllers/auth.controller');
const cartController = require('../cart/controller.cart');
const cartViewController = require('../controllers/cartViews.controller');
const chatController = require('../controllers/chat.controller');
const rtpController = require('../controllers/realtimeproducts.controller');
const currentController = require('../controllers/current.controller');

const router = (app) => {
    app.use('/api/sessions/current', currentController);
    app.use('/login', loginController);
    app.use('/register', registerController);
    app.use('/products', productsController);
    app.use('/auth', authController);
    app.use('/api/carts', cartController);
    app.use('/carts', cartViewController);
    app.use('/chat', chatController);
    app.use('/realtimeproducts', rtpController);
    app.use('*', (req, res) => {
        res.status(404).render('notfound', { style: 'notfound.css' });
    });
}

module.exports = router;