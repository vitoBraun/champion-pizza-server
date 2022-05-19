const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  variantName: { type: String, required: true },
  categoryName: { type: String, required: true },
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number },
  visible: { type: Boolean, default: true },
});

module.exports = model("ProductVariant", schema);
