const express = require('express');
const handlebars = require('express-handlebars');
const connectMongo = require('./db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const initializePassport = require('./configs/passport.config');
const { db } = require('./configs/index');
const MongoConnection = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600,
    }),
    secret: db.session,
    resave: false,
    saveUninitialized: false,
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

MongoConnection.getInstance();

router(app);

module.exports = app;