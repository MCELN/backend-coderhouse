const mongoose = require('mongoose');

const userCollection = 'user';

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        index: true,
    },
    age: Number,
    password: String,
    cart: String,
    role: String,
    status: Boolean,
});

userSchema.methods.serialize = function () {
    return {
        _id: this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        age: this.age,
        cart: this.cart,
        role: this.role,
        status: this.status,
    };
};

const Users = mongoose.model(userCollection, userSchema);

module.exports = Users;