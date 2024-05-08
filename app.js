const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRouters = require('./api/routes/orders');
const userRouters = require('./api/routes/user');


mongoose.connect('mongodb+srv://nadasabdalla644:'+ process.env.MONGO_ATLAS_PW +'@node-rest-shop.wkesgzp.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-shop',{
    // useMongoClient: true
    // useNewUrlParser: true, 
    // useUnifiedTopology: true
});


mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requasted-with,Content-type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELET,GET')
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productRoutes);
app.use('/orders', orderRouters);
app.use('/user', userRouters);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;