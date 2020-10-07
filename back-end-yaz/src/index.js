import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'
import userRoutes from './server/routes/UserRoutes';
import serviceRoutes from './server/routes/ServiceRoutes';
import payment_serviceRoutes from './server/routes/Payment_serviceRoutes';
import payment_itemRoutes from './server/routes/Payment_itemsRoutes';
import itemRoutes from './server/routes/ItemRoutes';
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
app.use('/service', serviceRoutes);
app.use('/payment_service', payment_serviceRoutes);
app.use('/payment_item', payment_itemRoutes);
app.use('/item', itemRoutes);

app.all('*', (req, res) => res.status(404).send({
  message: 'URL NOT FOUND',
}));

models.sequelize.sync({ alter: true, logging: false }).then(() => {
  app.listen(PORT, err => {
    if (err) {
      return console.log("Error: ", err);
    }
    console.log('Example app listening on port ', PORT)
  })
})