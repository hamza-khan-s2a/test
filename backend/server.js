
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import productRouter from './routers/productRouter.js'
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.set('strictQuery', false);
// mongoose.connect(config.MONGODB_URL).then(() => {
//   console.log('Connected to mongodb')
// }).catch((err) => console.error(`not connected ${err}`))

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
}

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.use('/api/order', orderRouter)
app.use('/api/product', productRouter)

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;

  res.status(status).send({ message: err.message })
})

app.use(express.static(path.join(__dirname, "../frontend")));
app.use('../frontend', express.static(path.join(__dirname + '../frontend')));
app.get('/server', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// app.listen(process.env.PORT || 5000, () => {
//   console.log('server at http://localhost:5000');
// });

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("listening for requests at http://localhost:5000");
  })
})