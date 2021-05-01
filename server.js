var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const GenerateResponse = require('./payment/payment-gateway');
const MailService = require('./service/email-service');

const stripe = require('stripe')('sk_test_51IjoKtLpaVzr78MNZ9Kj71j93vGPFLNH9VfVqrVEVO3Rz9rPdSKwFT5GePztogeQ5jdURy4i1gM7Qt1thf1SLkK000iekpcyDF')

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