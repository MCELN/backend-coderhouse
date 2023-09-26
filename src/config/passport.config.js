const passport = require('passport');
const local = require('passport-local');
const GitHubStrategy = require('passport-github2');
const Users = require('../DAOs/mongoDB/users.dao');
const Cart = require('../DAOs/mongoDB/cart.dao');
const { getHashPassword, comparePassword } = require('../utils/bcrypt');
const { github } = require('../config/index');

const UsersDao = new Users;
const CartDao = new Cart;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const {
                first_name,
                last_name,
                email,
                age,
            } = req.body;

            try {
                const user = await UsersDao.findOne({ email: username });

                if (user) {
                    console.log('Usuario en uso');
                    return done(null, false);
                }



                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: getHashPassword(password),
                    cart: await CartDao.createCart(),
                    role: 'user',
                }

                const infoUser = await UsersDao.create(newUser);

                return done(null, infoUser);

            } catch (error) {
                return done("Error al crear usuario; " + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await UsersDao.findOne({ email: username });
                if (!user) {
                    console.log('El usuario no existe');
                    return done(null, false);
                }

                if (!comparePassword(password, user.password)) return done(null, false);

                return done(null, user);

            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('github', new GitHubStrategy({
        clientID: github.clientID,
        clientSecret: github.clientSecret,
        callbackURL: github.callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const user = await UsersDao.findOne({ email: profile._json.email });

            if (!user) {
                const newUserInfo = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    age: 0,
                    password: '',
                    cart: await CartDao.createCart(),
                    role: 'user',
                }
                const newUser = await UsersDao.create(newUserInfo);

                return done(null, newUser);
            } else {
                return done(null, user);
            }

        } catch (error) {
            return done(error);
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UsersDao.findById(id);
        done(null, user);
    })
}

module.exports = initializePassport;