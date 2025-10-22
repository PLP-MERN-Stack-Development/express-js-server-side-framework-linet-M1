const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const validateProduct = require('../middleware/validateProduct');

// Custom error classes
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

// GET all products with filtering, search, and pagination
router.get('/', async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" }; // case-insensitive search

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    next(error);
  }
});

// GET a specific product by id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// CREATE a new product
router.post('/', validateProduct, async (req, res, next) => {
  const { id, name, description, price, category, inStock } = req.body;
  try {
    const product = new Product({ id, name, description, price, category, inStock });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    next(new ValidationError(error.message));
  }
});

// UPDATE a product by id
router.put('/:id', validateProduct, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// DELETE a product by id
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) throw new NotFoundError('Product not found');
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// GET product statistics: count by category
router.get('/stats/categories', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
