var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


require('dotenv').config({path: __dirname + '/.env'})

const PaymentRoutes = require('./routes/payment-routes');
const ProductRoutes = require('./routes/product-routes');
const UserRoutes = require('./routes/user-routes');
const DeliveryRoutes = require('./routes/delivery-routes');

const MONGO_DB_PASSWORD = process.env['MONGO_DB_PASSWORD'];
const connectionString = `mongodb+srv://admin:${MONGO_DB_PASSWORD}@thegadgetstore.qy1us.mongodb.net/thegadgetstore?retryWrites=true&w=majority`;

app = express(),
port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', PaymentRoutes);
app.use('/', ProductRoutes);
app.use('/', UserRoutes);
app.use('/delivery', DeliveryRoutes);

mongoose
.connect(connectionString)
.then(() => {
  app.listen(port, () => {
    console.log('Server is listening on port ' + port + `\n http://localhost:${port}`);
});
})
.catch(err => {
    console.log(err);
});
