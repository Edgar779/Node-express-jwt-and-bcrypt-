const users = require('../models/Users');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');
const config = require('../config/config');
// Register Page
exports.root = function (req, res) {

    res.render('register.hbs');

}

// register
exports.register = function (req, res) {

    const user = new users(req.body);

    const access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, config.jwt_secretKey).toString();

    user.tokens.push({ access, token });

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        user.password = hash;
        user.save().then(users => {
            res.header('x-auth', token).render('home.hbs', {
                name: users.name,
                surname: users.surname,
                email: users.email
            });
        }).catch(err => {
            res.json(err);
        });
    });

}
// get User By Token
exports.getUserbyToken = function (req, res) {
    const token = req.header('x-auth');
    var decoded;
    try {
        decoded = jwt.verify(token, config.jwt_secretKey);
    }
    catch (e) {
        return res.status(401).send(e);
    }
    users.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }).then(user => {
        if (!user) {
            res.json('user is not defined');
        }
        res.json(user);
    }).catch(err => {
        res.json(err);
    })

}