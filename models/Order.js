const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    orderId: { type: Number },
    date: { type: Date, default: Date.now() },
    customerName: { type: String, required: true },
    customerAddress: { type: String },
    orderObj: { type: Array, required: true },
    orderComment: { type: String }
});

module.exports = model("Order", schema);
