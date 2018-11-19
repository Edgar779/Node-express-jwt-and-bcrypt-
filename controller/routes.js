const user = require('./user');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(express.static(__dirname + '../public'));
router.get('/', user.root);

router.post('/register', user.register);

router.get('/users/me', user.getUserbyToken);

router.get('/favicon.ico', (req, res) => res.status(204));


module.exports = router;