const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: إدارة الفئات
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: جلب كل الفئات
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: تم جلب الفئات بنجاح
 *       500:
 *         description: خطأ في السيرفر
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: إضافة فئة جديدة
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: تم إضافة الفئة بنجاح
 *       400:
 *         description: بيانات غلط
 */
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: حذف فئة
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID الفئة
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *       500:
 *         description: خطأ في السيرفر
 */
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;