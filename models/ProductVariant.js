const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    variantName: {type: String, required: true},
    categoryName: {type: String, required: true},
    productName: {type: String, required: true},
    price:{type: Number, required: true},
    weight:{type: Number},
})

module.exports = model('ProductVariant', schema)