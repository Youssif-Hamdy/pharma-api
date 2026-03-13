const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  brand: { type: String },
  price: { type: Number },
  productUrl: { type: String },
  priceStatus: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);