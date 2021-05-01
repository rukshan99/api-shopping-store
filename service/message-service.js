var twilio = require('twilio');

require('dotenv').config({path: __dirname + '/.env'})

const TWILIO_ACCOUNT_SID = process.env['TWILIO_ACCOUNT_SID'];
const TWILIO_AUTH_TOKEN = process.env['TWILIO_AUTH_TOKEN'];
const TWILIO_NUMBER = process.env['TWILIO_NUMBER'];

const MessageService = number => {
    var client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    client.messages.create({
      to: number,
      from: TWILIO_NUMBER,
      body: 'The Gadget Store: Your payment was successful. Thank you!'
    });
}

module.exports = MessageService;