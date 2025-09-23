import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404); throw new Error('Product not found (Invalid ID)');
  }
  const product = await Product.findById(req.params.id);
  if (product) { res.json(product); } 
  else { res.status(404); throw new Error('Product not found'); }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, bargainingEnabled } = req.body;

  if (!name || !price || !description || !image || !category) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const product = new Product({
    name,
    price,
    description,
    image,
    category,
    bargainingEnabled,
    user: req.user.id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }
    if (product.user.toString() !== req.user.id) { res.status(401); throw new Error('User not authorized'); }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product removed' });
});

export { getProducts, getProductById, createProduct, deleteProduct };