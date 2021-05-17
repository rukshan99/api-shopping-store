const nodemailer = require("nodemailer");

require('dotenv').config({path: __dirname + '/.env'})

const GMAIL_USERNAME = process.env['GMAIL_USERNAME'];
const GMAIL_PASSWORD = process.env['GMAIL_PASSWORD'];

async function MailService() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",//"smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USERNAME,
      pass: GMAIL_PASSWORD
    },
  });

  let info = await transporter.sendMail({
    from: '"The Gadget Store 👻" <gadgets@store.com>',
    to: "rukshanjayasekara@outlook.com",
    subject: "Payment Successful ✔",
    text: "Thank you! Visit us again.",
    html: "<b>Thank you! Visit us again.</b>",
  });

}

MailService().catch(console.error);

module.exports = MailService;