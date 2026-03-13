const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected!');

  const rawData = fs.readFileSync(__dirname + '/drdiamond_products_seed.json', 'utf-8');
  const data = JSON.parse(rawData.replace(/NaN/g, 'null'));

  // Products
  await Product.deleteMany();
  const products = data.map(p => ({
    name: p['Product Name'],
    category: p['Category'],
    brand: p['Brand'],
    price: p['Price EGP'],
    productUrl: p['Product URL'],
    priceStatus: p['Price Status'],
    notes: p['Notes'] || ''
  }));
  await Product.insertMany(products);
  console.log(`✅ ${products.length} products inserted!`);

  // Categories
  await Category.deleteMany();
  const uniqueCategories = [...new Set(data.map(p => p['Category']).filter(Boolean))];
  await Category.insertMany(uniqueCategories.map(name => ({ name })));
  console.log(`✅ ${uniqueCategories.length} categories inserted!`);

  // Brands
  await Brand.deleteMany();
  const uniqueBrands = [...new Set(data.map(p => p['Brand']).filter(Boolean))];
  await Brand.insertMany(uniqueBrands.map(name => ({ name })));
  console.log(`✅ ${uniqueBrands.length} brands inserted!`);

  process.exit();
};

seedDB();