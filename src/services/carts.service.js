const CartDao = require('../DAOs/mongoDB/cart.dao');
const { findByIdProduct, updateOneProduct } = require('./products.service');

const Cart = new CartDao();

const findCarts = async () => {
    try {
        return await Cart.findAll();
    } catch (error) {
        throw error;
    }
}

const findByIdCart = async (id) => {
    try {
        return await Cart.findById(id);
    } catch (error) {
        throw error;
    }
}

const findOneCart = async (prop) => {
    try {
        return await Cart.findOne(prop);
    } catch (error) {
        throw error;
    }
}

const createCart = async () => {
    try {
        return await Cart.createCart()
    } catch (error) {
        throw error;
    }
}

const updateOneCart = async (ip) => {
    try {
        await Cart.updateOne(id);
        return 'Actualización completa';
    } catch (error) {
        throw error;
    }
}

const insertOneCart = async (cid, pid, qty) => {
    try {
        const productCart = await findByIdCart(cid)
        const product = await findByIdProduct(pid);
        let oldQty = 0;

        if (!product) {
            return 'El producto que desea agregar, no existe.';
        } else if (!productCart) {
            return 'El carrito no existe.';
        } else {
            const existsIndex = productCart.products.findIndex(p => p.product.equals(pid));
            if (existsIndex >= 0) {
                oldQty = productCart.products[existsIndex].quantity;
                product.stock += oldQty;
            }
            if (product.stock >= qty) {
                if (existsIndex >= 0) {
                    productCart.products[existsIndex].quantity = oldQty + qty;
                } else {
                    const newProduct = {
                        product: pid,
                        quantity: qty,
                    };
                    productCart.products.push(newProduct);
                }

                await productCart.save();
                await updateOneProduct(pid, 'stock', product.stock - (oldQty + qty));

                return 'El producto se ha agregado a su carrito.';

            } else {
                return 'Lo sentimos. No disponemos de ese stock.';
            };
        }
    } catch (error) {
        throw error;
    }
}

const deleteProductCart = async (cid, pid) => {
    try {
        const productCart = await findByIdCart(cid);
        const existsIndex = productCart.products.findIndex(p => p.product.equals(pid));
        const product = await findByIdProduct(pid);

        if (existsIndex >= 0) {
            const oldQty = productCart.products[existsIndex].quantity;
            product.stock += oldQty;

            productCart.products.splice(existsIndex, 1);

            await productCart.save();
            await updateOneProduct(pid, 'stock', product.stock);

            return `El producto ${product.title} ha sido eliminado del carrito.`;
        } else {
            return `El producto con id ${pid}, no existe en el carrito.`;
        }
    } catch (error) {
        throw error;
    }
}

const deleteAllProductsCart = async (cid) => {
    try {
        const productCart = await findByIdCart(cid);

        productCart.products.forEach(async p => {
            const prodMod = await findByIdProduct(p.product._id)
            await updateOneProduct(p.product._id, 'stock', prodMod.stock + p.quantity)
        })

        const allProducts = productCart.products.length;
        productCart.products.splice(0, allProducts);
        await productCart.save();
        return `Todos los productos del carrito ${cid}, han sido quitados.`;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findCarts,
    findByIdCart,
    findOneCart,
    createCart,
    updateOneCart,
    insertOneCart,
    deleteProductCart,
    deleteAllProductsCart
}