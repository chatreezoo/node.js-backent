// const express = require('express');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();
// //bring routes
// const indexRoutes = require('./routes/index');
// //const productRoutes = require('./routes/product');
// //const blogRoutes = require('./routes/blog');
// //const authRoutes = require('./routes/auth');
// //const userRoutes = require('./routes/user');
// //const categoryRoutes = require('./routes/category');
// //const tagRoutes = require('./routes/tag');
// //const formRoutes = require('./routes/form');
// //app
// const app = express();
// //db
// mongoose
//     .connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
//     .then(() => console.log('DB Connected'))
//     .catch(err => {
//         console.log(err);
//     });
// //middlewares
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(cookieParser());
// //cors
// if (process.env.NODE_ENV === 'development') {
//     app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }
// //routes midlleware
// app.use('/api', indexRoutes);
// //app.use('/api', productRoutes);
// //app.use('/api', blogRoutes);
// //app.use('/api', authRoutes);
// //app.use('/api', userRoutes);
// //app.use('/api', categoryRoutes);
// //app.use('/api', tagRoutes);
// //app.use('/api', formRoutes);
// //port
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//     console.log(`Server runing on http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const colors = require("colors");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://Chatree:ryFt2eBL8mveUsS8@cluster0.4czda.gcp.mongodb.net/database?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }
);
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    name: String,
    description: String,
    images: String,
    price: Number,
    stock: String,
    colors: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
app.get("/api/products/:id", async (req, res) => {
    const products = await Product.findById(req.params.id);
    res.send(products);
  });

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server Running on http://localhost${port}`.yellow.bold)
);