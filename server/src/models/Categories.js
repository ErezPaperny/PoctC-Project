const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  mainCategoryId: { type: String, default: '' },
  active: { type: Boolean, required: true },
});

module.exports = mongoose.model('categories', categorySchema);
