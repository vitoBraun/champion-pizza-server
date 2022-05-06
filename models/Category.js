const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    categoryName: {type: String, required: true},
    categoryOrder: {type: Number}
})

module.exports = model('Category', schema)