const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const HttpError = require('../model/http-error');
const products = require('../schema/productSchema');



exports.findAll = (req, res) => {

  const brand = req.query.brand;
  var condition = brand ? { brand: { $regex: new RegExp(brand), $options: "i" } } : {};
    products.find(condition)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  products.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });

};


const id = req.params.id; //'60a56c20748fb33970ad5a1d'

products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  products.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};



const addingProducts = async (req, res, next) => {
    console.log('Adding the product');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs! Please check again.', 422));
    }

 

    //const { name, email, amount, mobile, cardNo, expDate, cvc } = req.body;
    const { productName, displaySize, RAMSize, internalMemory, brand, serialNumber, price, imageName, imageData } = req.body;

    const addedProducts = new products({
        //product_id,
        //uid,
        productName,
        displaySize,
        RAMSize,
        internalMemory,
        brand,
        serialNumber,
        price,
        imageName,
        imageData,
        count: 1
    });
    

    


    try{
        //console.log(addedProducts);
        const session = await mongoose.startSession();
        session.startTransaction();
        await addedProducts.save({ session: session });
        await session.commitTransaction();
    } catch(err) {
        const error = new HttpError(
            'Error occured while saving products details. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({products: addingProducts});
};

exports.addingProducts = addingProducts;
