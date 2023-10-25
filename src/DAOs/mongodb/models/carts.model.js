const mongoose = require('mongoose');

const cartController = 'cart';

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }],
        defautl: [],
    },
});

cartSchema.pre(['find', 'findOne'], function () {
    this.populate({ path: 'products.product', select: 'title description price thumbnail code category' });
})

const Cart = mongoose.model(cartController, cartSchema);

module.exports = Cart;