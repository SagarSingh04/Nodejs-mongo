const express = require("express");
const router = express.Router();
const fs = require("fs");
const Product = require("../models/product");
const mongoose = require("mongoose");

router.get('/', async (req, res, next) => {
    
    try{
    
        let newProduct = await Product.find().exec();
        console.log(newProduct);
        res.status(200).send(newProduct);
    }
    catch(err){
        res.status(500).json({ error: err});
    }
});

router.get('/:productId', async (req, res, next) => {
    const id = req.params.productId;
    try{

        let newProduct = await Product.find({ "id": id});
        console.log(newProduct);
        res.status(200).send(newProduct);
    }catch(err){
        res.status(500).json({ error: err});
    }

});

router.post('/', async (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        id: req.body.id
    });

   try{
        const newProduct = await product.save();

        console.log(newProduct);
        res.status(201).json({
            message: 'Handling POST request to /products',
         createdProduct: newProduct
        });
    }catch(err){
        res.status(500).send(err);
    }
});

router.put('/:productId', async (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    try{
        let newProduct = await Product.update({ "id": id}, { $set: updateOps}).exec();
        console.log(newProduct);
        res.status(200).send(newProduct);
    }catch(err){
        res.status(200).json({
            error: err
        });
    }
    
});

router.delete('/:productId', async (req, res, next) => {
    const id = req.params.productId;
    
    try{
        let newProduct = await Product.remove({ "id": id});
        console.log(newProduct);
        res.status(200).send(newProduct);
    }catch(err){
        res.status(500).json({
            error: err
        });
    }
    
});

module.exports = router;