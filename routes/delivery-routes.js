const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const deliveryControllers = require('../controller/delivery-controller');

router.post('/delivery', 
[
    // check('name').not().isEmpty(), 
    // check('email').not().isEmpty(),
    // //check('amount').not().isEmpty(),
    // check('mobile').not().isEmpty(),
    // check('cardNo').not().isEmpty(),
    // //check('cvc').not().isEmpty(),
], 
deliveryControllers.createDelivery);

router.get('/delivery', deliveryControllers.getDeliveryDetails);

router.route('/').get(function(req, res) {
 
  res.json("Hi From Sachini");

});

router.route('/Addshipment').post(function(req, res) {
  console.log(req)

    const fetch = require('node-fetch');

   
const url = 'https://api.easyship.com/v2/shipments';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer prod_aOOu5mpDG4bd0yK5Z6UU5bTRfw4RYBDcNqbn7yy6WcY='
  },
  body: JSON.stringify(req.body)
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
   
});

module.exports = router;