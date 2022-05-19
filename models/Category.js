const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  categoryName: { type: String, required: true },
  categoryOrder: { type: Number },
  visible: { type: Boolean, default: false },
});

module.exports = model("Category", schema);
