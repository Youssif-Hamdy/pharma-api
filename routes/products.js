const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: إدارة المنتجات
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: جلب كل المنتجات
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: فلتر بالـ category ID
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: فلتر بالـ brand ID
 *     responses:
 *       200:
 *         description: تم جلب المنتجات بنجاح
 *       500:
 *         description: خطأ في السيرفر
 */
router.get('/', async (req, res) => {
  try {
    const { category, brand } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: جلب منتج بالـ ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID المنتج
 *     responses:
 *       200:
 *         description: تم جلب المنتج بنجاح
 *       404:
 *         description: المنتج مش موجود
 *       500:
 *         description: خطأ في السيرفر
 */
router.get('/', async (req, res) => {
  try {
    const { category, brand } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter)
      .populate('category', 'name')
      .populate('brand', 'name');
      
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: إضافة منتج جديد
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *     responses:
 *       201:
 *         description: تم إضافة المنتج بنجاح
 *       400:
 *         description: بيانات غلط
 */
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: تعديل منتج
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID المنتج
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *     responses:
 *       200:
 *         description: تم التعديل بنجاح
 *       404:
 *         description: المنتج مش موجود
 *       400:
 *         description: بيانات غلط
 */
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) 
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: حذف منتج
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID المنتج
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *       404:
 *         description: المنتج مش موجود
 *       500:
 *         description: خطأ في السيرفر
 */
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) 
      return res.status(404).json({ message: 'Product not found' });

    res.json({ message: '✅ Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;