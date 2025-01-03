const mongoose = require('mongoose');

const orderSchemaRules = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming there's a 'User' model for users
    required: true,
  },
  products: [{
    name: String,
    image:String,
    quantity: Number,
    price: Number,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}
const OrderSchema = new mongoose.Schema(orderSchemaRules);

const OrderModel=mongoose.model("order_management",OrderSchema);

module.exports=OrderModel;
