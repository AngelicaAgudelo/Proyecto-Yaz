import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'
import userRoutes from './server/routes/UserRoutes';
import serviceRoutes from './server/routes/ServiceRoutes';
import payment_serviceRoutes from './server/routes/Payment_serviceRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/service', serviceRoutes);
app.use('/payment_service', payment_serviceRoutes);

app.get('*', (req, res) => res.status(404).send({
  message: 'URL NOT FOUND',
}));

app.listen(process.env.PORT, () =>
  console.log('Example app listening on port ', process.env.PORT)
);