const mongoose = require('mongoose');

const productSchemaRules = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, required: true },
  stocks: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}
const ProductSchema=new mongoose.Schema(productSchemaRules);

const ProductModel=mongoose.model("product_management",ProductSchema);

module.exports=ProductModel;
