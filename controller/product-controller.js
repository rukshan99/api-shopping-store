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
          res.status(404).send({ message: "Not found Product with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Product with id=" + id });
      });
  
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  products.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });

};


const id = req.params.id; 

products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  products.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
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

 

  
    const { productName, displaySize, RAMSize, internalMemory, brand, serialNumber, price, imageName, imageData } = req.body;

    const addedProducts = new products({
        
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
