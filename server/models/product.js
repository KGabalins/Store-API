const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided!"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided!"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    required: [true, "Product company must be provided"],
    enum: {
      values: ["Ikea", "Liddy", "Caressa", "Marcos"],
      message: "{VALUE} is not supported!",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
