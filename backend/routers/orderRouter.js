import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js"
import Order from '../models/orderModel.js'

const orderRouter = express.Router()

// orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
//   const order = await Order.find({ user: req.user.id })
//   console.log(`order is ${order}`);
//   res.send(order)

// }))
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    console.log(orders)
    res.send(orders);
  })
);

// orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
//   console.log('i am here');
//   const order = await Order.findById(req.params.id)
//   if (order) {
//     res.send(order)
//   } else {
//     res.status(404).send({ message: 'Order Not Found' })
//   }
// }))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    res.send(order)
  } else {
    res.status(404).send({ message: 'Order Not Found' })
  }
}))

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {

  const order = new Order({
    orderItems: req.body.orderItems,
    user: req.user.id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemPrice: req.body.itemPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
  });
  const createOrder = await order.save();
  res.status(201).send({ message: 'New Order Created', order: createOrder })
})
);




export default orderRouter