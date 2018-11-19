const mongoose = require('mongoose');
const validator = require('validator');
const config = require('../config/config');
mongoose.connect(config.db_url, { useNewUrlParser: true });

const user = new mongoose.Schema({
    name: {type: String, unique: true},
    surname: {type: String, unique: true},
    password: {type: String, minlength: 8},
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email'
        }
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('users', user);
