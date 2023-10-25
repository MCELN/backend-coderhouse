const passport = require('passport');
const local = require('passport-local');
const GitHubStrategy = require('passport-github2');
const cartServices = require('../services/carts.service');
const userService = require('../services/users.service');
const { getHashPassword, comparePassword } = require('../utils/bcrypt.util');
const { github } = require('../configs/index');

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
                const user = await userService.getOne({ email: username });

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
                    cart: await cartServices.create(),
                    role: 'user',
                }

                const infoUser = await userService.create(newUser);

                return done(null, infoUser);

            } catch (error) {
                return done("Error al crear usuario; " + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await userService.getOne({ email: username });
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
            const user = await userService.getOne({ email: profile._json.email });

            if (!user) {
                const newUserInfo = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    age: 0,
                    password: '',
                    cart: await cartServices.create(),
                    role: 'user',
                }
                const newUser = await userService.create(newUserInfo);

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
        const user = await userService.getById(id);
        done(null, user);
    })
}

module.exports = initializePassport;