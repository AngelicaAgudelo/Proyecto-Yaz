import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/UserRoutes';
import serviceRoutes from './server/routes/ServiceRoutes';
import payment_serviceRoutes from './server/routes/Payment_serviceRoutes';
import payment_itemRoutes from './server/routes/Payment_itemsRoutes';
import itemRoutes from './server/routes/ItemRoutes';
import service_requestRoutes from './server/routes/Service_requestRoutes';
import models from './server/src/models';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/payment_services', payment_serviceRoutes);
app.use('/payment_items', payment_itemRoutes);
app.use('/items', itemRoutes);
app.use('/service_requests', service_requestRoutes);

app.all('*', (req, res) => {
  res.status(404).send({
    message: 'URL NOT FOUND',
  })
});

models.sequelize.sync({ alter: true, logging: false }).then(() => {
  app.listen(PORT, err => {
    if (err) {
      return console.log("Error: ", err);
    }
    console.log('Example app listening on port ', PORT)
  })
})