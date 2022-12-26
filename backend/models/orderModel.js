import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usrt',
    required: true
  },
  shipping: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  payment: {
    paymentMethod: String,
    paymentResult: {
      orderId: String,
      payerId: String,
      paymentId: String,
    },
  },
  itemPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, requires: true, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, requires: true, default: false },
  deliveredAt: Date

}, {
  timestamps: true
})

const Order = mongoose.model('order', orderSchema)
export default Order;