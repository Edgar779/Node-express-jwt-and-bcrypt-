const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./controller/routes');
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
let _ = require('lodash');

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(routes);

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is working on port ${PORT}`);
})