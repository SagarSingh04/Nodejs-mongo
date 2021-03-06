const app = require("express")();
const productRoutes = require('./api/routes/products');
const orderRoutes = require("./api/routes/orders");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/mydb";

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

mongoose.connect(url, { useNewUrlParser: true })

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;