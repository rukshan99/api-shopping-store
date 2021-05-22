const nodemailer = require("nodemailer");

require('dotenv').config({path: __dirname + '/.env'})

const GMAIL_USERNAME = process.env['GMAIL_USERNAME'];
const GMAIL_PASSWORD = process.env['GMAIL_PASSWORD'];

const MailService = async (reqBody) => {

  const { name, email, amount } = reqBody;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USERNAME,
      pass: GMAIL_PASSWORD
    },
  });

  let info = await transporter.sendMail({
    from: '"The Gadget Store 👻" <gadgets@store.com>',
    to: `${email}`,
    subject: "Payment Successful ✔",
    text: "Thank you! Visit us again.",
    html: `<b>Hi ${name}!</b><br/>We received you payment of $${amount}.<br/>Thank you.`,
  });

}

MailService().catch(console.error);

module.exports = MailService;