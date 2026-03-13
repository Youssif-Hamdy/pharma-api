const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Manage brands
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Brands retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: إضافة ماركة جديدة
 *     tags: [Brands]
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
 *         description: تم إضافة الماركة بنجاح
 *       400:
 *         description: بيانات غلط
 */
router.post('/', async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: حذف ماركة
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID الماركة
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *       500:
 *         description: خطأ في السيرفر
 */
router.delete('/:id', async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Brand deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;