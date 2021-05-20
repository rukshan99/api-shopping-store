const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

router.route('/').get(function(req, res) {
 
  res.json("Delivery service");

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