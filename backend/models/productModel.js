import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ProductCategory: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  noOfReviews: { type: Number, required: true },
  qty: { type: Number, required: true },
  featuredImage: { data: Buffer, contentType: String },
  image: { type: String, required: true }
});

const Product = mongoose.model('product', productSchema);

export default Product;