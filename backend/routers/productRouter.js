
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js"
import multer from "multer";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './frontend/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.fieldname + '.webp')
  }

})
const upload = multer({ storage: storage })

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.find({});

    res.send(product);
  })
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
}));


productRouter.post('/inventory', upload.single("featuredImage"), expressAsyncHandler(async (req, res) => {
  const product = new Product({

    name: req.body.name,
    ProductCategory: req.body.ProductCategory,
    price: req.body.price,
    brand: req.body.brand,
    rating: req.body.rating,
    noOfReviews: req.body.noOfReviews,
    qty: req.body.qty,
    path: req.body.path,
    featuredImage: req.file,
    image: req.file.filename

  });


  const createProduct = await product.save();
  if (!createProduct) {
    res.status(401).send({
      message: "InValid Data"
    })
  } else {
    res.send({
      name: createProduct.name,
      ProductCategory: createProduct.ProductCategory,
      price: createProduct.price,
      brand: createProduct.brand,
      rating: createProduct.rating,
      noOfReviews: createProduct.noOfReviews,
      qty: createProduct.qty,
      path: createProduct.path,
      image: createProduct.image

    })
  }
})
);







export default productRouter;