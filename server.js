var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

require('dotenv').config({path: __dirname + '/.env'})

const GenerateResponse = require('./payment/payment-gateway');
const MailService = require('./service/email-service');
const MessageService = require('./service/message-service');

const MONGO_DB_PASSWORD = process.env['MONGO_DB_PASSWORD'];
const connectionString = `mongodb+srv://admin:${MONGO_DB_PASSWORD}@thegadgetstore.qy1us.mongodb.net/thegadgetstore?retryWrites=true&w=majority`;

const STRIPE_SECRET_KEY = process.env['STRIPE_SECRET_KEY'];
const stripe = require('stripe')(STRIPE_SECRET_KEY);

app = express(),
port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/pay', async (request, response) => {
    try {
      // Create the PaymentIntent
      let intent = await stripe.paymentIntents.create({
        payment_method: request.body.payment_method_id,
        description: "Test payment",
        amount: request.body.amount * 100,
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true
      });
      // Send the response to the client
      response.send(GenerateResponse(intent));
      MailService();
      MessageService(request.body.mobile);
      console.log(request.body.mobile);
    } catch (e) {
      // Display error on client
      return response.send({ error: e.message });
    }
  });

app.get('/pay', (req, res) => {
    res.send('Payment Gateway.');
});



app.listen(port, () => {
    console.log('Server is listening on port ' + port + `\n http://localhost:${port}`);
});