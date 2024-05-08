const Product = require('../models/product');
const mongoose = require('mongoose');


exports.producs_get_all = (req, res, next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    requests: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        };
        // if (docs.length >= 0){
            res.status(200).json(response)
        // }else{
        //     res.status(404).json({
        //         message: 'no entries found'
        //     })
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            Error: err
        });
    })
}

exports.products_creat_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price ,
        productImage: req.file.path
    })
    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'created products successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            Error: err
        });
    })
    
}

exports.products_get_product = (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("from deta base" ,doc);
        if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'
                }
            });
        }else{
            res.status(404).json({message: "no valid entry found for provided id"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({Error: err})
    })
}

exports.products_update_product = (req, res, next) => {
    const id = req.params.productID; 
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.findOneAndUpdate({ _id: id }, { $set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "product updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.products_delet_product = (req, res, next) => {
    const id = req.params.productID; 
    Product.findOneAndDelete({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "product deleted",
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products/',
                body: { name: 'String', price: 'Number'}
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}